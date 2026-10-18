import {Injectable} from '@angular/core';
import {GoogleAnalytics} from '@ionic-native/google-analytics/ngx';
import {Platform} from '@ionic/angular';
import {environment} from '../../../environments/environment';
import {isNativeCordovaPlatform} from '../utils/native-platform';

@Injectable({
  providedIn: 'root'
})
export class GAService {
  private _initialzed = false;

  constructor (
    private ga: GoogleAnalytics,
    private platform: Platform,
  ) { }

  async init() {
    if (! isNativeCordovaPlatform()) {
      return false;
    }

    if (this._initialzed) {
      return true;
    }

    try {
      await this.ga.startTrackerWithId(environment.googleAnalytics.trackId);

      this.ga.enableUncaughtExceptionReporting(true);

      this._initialzed = true;
    } catch (e) {
      return false;
    }
  }

  async trackView(title: string, campaignUrl?: string, newSession?: boolean) {
    if (! isNativeCordovaPlatform()) {
      return false;
    }

    try {
      await this.init();
      return this.ga.trackView(title, campaignUrl, newSession);
    } catch (e) {}
  }

  async debugMode() {
    if (! isNativeCordovaPlatform()) {
      return false;
    }

    try {
      await this.init();
      return this.ga.debugMode();
    } catch (e) {}
  }

  async setUserId(id: string) {
    if (! isNativeCordovaPlatform()) {
      return false;
    }

    try {
      await this.init();
      return this.ga.setUserId(id);
    } catch (e) {}
  }

  async trackEvent(category: string, action: string, label?: string, value?: number, newSession?: boolean) {
    if (! isNativeCordovaPlatform()) {
      return false;
    }

    try {
      await this.init();
      return this.ga.trackEvent(category, action, label, value, newSession);
    } catch (e) {}
  }

  async setAppVersion(appVersion: string) {
    if (! isNativeCordovaPlatform()) {
      return false;
    }

    try {
      await this.init();

      if (this.platform.is('android')) {
        appVersion = 'android-' + appVersion;
      } else if (this.platform.is('ios')) {
        appVersion = 'ios-' + appVersion;
      }

      return this.ga.setAppVersion(appVersion);
    } catch (e) {}
  }

  trackException(description: string, fatal: boolean) {
    if (! isNativeCordovaPlatform()) {
      return false;
    }

    return this.ga.trackException(description, fatal);
  }
}
