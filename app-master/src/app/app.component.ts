import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {GAService} from './shared/services/ga.service';
import {NavigationEnd, Router} from '@angular/router';
import {SessionService} from './auth/state/session.service';
import {SessionQuery} from './auth/state/session.query';
import {Deeplinks} from '@ionic-native/deeplinks/ngx';
import {RapitipsPage} from './rapitip/pages/rapitips/rapitips.page';
import {RapitipPage} from './rapitip/pages/rapitip/rapitip.page';
import {AlertService} from './shared/services/alert.service';
import {isNativeCordovaPlatform} from './shared/utils/native-platform';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  me$ = this.sessionQuery.me$;
  loading$ = this.sessionQuery.selectLoading();

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navCtrl: NavController,
    private ga: GAService,
    private router: Router,
    private sessionQuery: SessionQuery,
    private sessionService: SessionService,
    private deeplinks: Deeplinks,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.loadProductionResources();
    this.initializeApp();

    this.setupGoogleAnalytics();

    this.setupDeeplinks();
  }

  ngOnDestroy() { }

  private loadProductionResources() {
    if (!environment.production) {
      return;
    }

    [
      'https://fonts.googleapis.com/css?family=Open+Sans',
      'https://fonts.googleapis.com/icon?family=Material+Icons',
    ].forEach(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    });

    const paymentSdk = document.createElement('script');
    paymentSdk.src = 'https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js';
    paymentSdk.async = false;
    document.head.appendChild(paymentSdk);
  }

  async initializeApp() {
    await this.platform.ready();

    if (!isNativeCordovaPlatform()) {
      return;
    }

    this.statusBar.backgroundColorByHexString('#2196f3');
    this.statusBar.styleLightContent();
    this.splashScreen.hide();
  }

  async setupGoogleAnalytics() {
    await this.ga.init();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.ga.trackView(event.urlAfterRedirects);
      }
    });
  }

  setupDeeplinks() {
    if (!isNativeCordovaPlatform()) {
      return;
    }

    this.deeplinks
      .route({
        '/rapitips': RapitipsPage,
        '/rapitips/:rapiTipId': RapitipPage,
      })
      .subscribe(
        match => {
          this.navCtrl.navigateForward(match.$link.path);
        },
        nomatch => {}
      );
  }

  logout() {
    this.alertService.confirm('¿Segur@ que deseas salir?').subscribe(() => {
      this.sessionService.logout();
    });
  }

}
