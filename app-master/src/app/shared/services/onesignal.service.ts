import {Injectable} from '@angular/core';
import {OneSignal} from '@ionic-native/onesignal/ngx';
import {Platform} from '@ionic/angular';
import {environment} from '../../../environments/environment';
import {
  RegisterPushTokenGQL,
  RegisterPushTokenInput
} from '../../../graphql/generated/graphql';
import {isNativeCordovaPlatform} from '../utils/native-platform';

@Injectable({
  providedIn: 'root',
})
export class OnesignalService {

  private initialized = false;

  private WebPushSDK: any = {
    loaded: false,
    src: 'https://cdn.onesignal.com/sdks/OneSignalSDK.js',
  };

  OneSignalBrowser: any;

  constructor (
    private platform: Platform,
    private OneSignalCordova: OneSignal,
    private registerPushTokenGQL: RegisterPushTokenGQL,
  ) { }

  async init() {
    this._log('init');

    // Es necesario indicar explícitamente (a través de una variable de entorno,
    // por ejemplo) cuando se va a trabajar en Browser.
    // `this.platform.is('cordova')` no es suficiente ya que Browser es una plataforma
    // que corre sobre Cordova. Aún así, `@ionic-native/onesignal` no tiene una
    // implementación para Browser.

    return isNativeCordovaPlatform() ? this._initCordova() : this._initBrowser();
  }

  private _initBrowser() {
    this._log('initBrowser');

    return new Promise((resolve, reject) => {
      if (this.initialized === true) {
        return resolve(this);
      }

      this.platform.ready().then(() => {
        // El plugin de Cordova se inyecta en `window['OneSignal']`. Lo eliminamos.
        window['OneSignal'] = null;

        this.loadWebPushSDK().then(() => {
          // El SDK de WebPush ya ha sido cargado y ahora debemos inicializarlo
          // normalmente.

          this.OneSignalBrowser = window['OneSignal'] || [];

          this.OneSignalBrowser.push(() => {
            this.OneSignalBrowser.init({
              appId: environment.onesignal.appId,
            });
          });

          this.initialized = true;

          this._log('initialized', this.OneSignalBrowser);

          return resolve(this);
        }, (errors: any) => {
          reject(errors);
        });
      }, (errors: any) => {
        reject(errors);
      });
    });
  }

  private _initCordova() {
    return new Promise((resolve, reject) => {
      if (this.initialized === true) {
        return resolve(this);
      }

      this.platform.ready().then(() => {
        this.OneSignalCordova.startInit(environment.onesignal.appId, environment.onesignal.googleProjectId);

        this.OneSignalCordova.inFocusDisplaying(this.OneSignalCordova.OSInFocusDisplayOption.Notification);

        // this.OneSignalCordova.handleNotificationReceived().subscribe((data) => {
        //   this._log('received', data);
        // });

        this.OneSignalCordova.handleNotificationOpened().subscribe((data) => {
          this._log('opened', data);
          this.handle(data.notification.payload.additionalData, data.notification.payload);
        });

        this.OneSignalCordova.endInit();

        this.initialized = true;

        return resolve(this);
      });
    });
  }

  handle(data: any, payload?: any) {
    // if (data.groupId) {
    //   this.groupService
    //     .setActive(data.groupId)
    //     .subscribe(() => {
    //       if (data.membershipId) {
    //         this.groupService.setActiveMembership(data.membershipId);
    //       }
    //     });
    // }
  }

  async register() {
    this._log('register');

    if (!environment.production) {
      return false;
    }

    await this.init();

    return isNativeCordovaPlatform() ? this._registerCordova() : this._registerBrowser();
  }

  async _registerBrowser() {
    this._log('registerBrowser');
    try {
      await this.init();

      let isEnabled = await this.isEnabled();
      this._log('is enabled 1 ?', isEnabled);

      if (! isEnabled) {
        await this.OneSignalBrowser.registerForPushNotifications({
          modalPrompt: true
        });

        isEnabled = await this.isEnabled();

        this._log('is enabled 2 ?', isEnabled);

        if (! isEnabled) {
          this._log('is not enabled');
          return false;
        }
      }

      const token = await this.OneSignalBrowser.getUserId();

      this._log('token', token);

      this.registerPushToken({
        token: token,
      });

      return true;
    } catch (e) {
      return false;
    }
  }

  _registerCordova() {
    this._log('registerCordova');
    return this.OneSignalCordova.getIds().then(value => {
      this._log('ids', value);
      this.registerPushToken({
        token: value.userId,
        // userId: value.pushToken, // TODO: Que hacer con esto?
      });
    });
  }

  async isEnabled() {
    return isNativeCordovaPlatform() ? this._isEnabledCordova() : this._isEnabledBrowser();
  }

  private async _isEnabledBrowser() {
    try {
      await this.init();

      return await this.OneSignalBrowser.isPushNotificationsEnabled();
    } catch (e) {
      return false;
    }
  }

  private async _isEnabledCordova() {
    return true; // TODO: En ios podrían estar deshabilitadas las push notifications.
  }

  /**
   * Tomado de `https://stackoverflow.com/a/42766146/2522130`.
   */
  private loadWebPushSDK() {
    return new Promise((resolve, reject) => {
      if (this.WebPushSDK.loaded) {
        resolve(true);
      } else {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = this.WebPushSDK.src;

        script.onload = () => {
          this.WebPushSDK.loaded = true;

          resolve(true);
        };

        script.onerror = () => {
          reject(false);
        };

        document.getElementsByTagName('head')[0].appendChild(script);
      }
    });
  }

  registerPushToken(input: RegisterPushTokenInput) {
    this.registerPushTokenGQL
      .mutate({
        input: input,
      })
      .subscribe();
  }

  private _log(...args) {
    // console.debug('[onesignal]', ...args);
  }

}
