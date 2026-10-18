import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {NavigationService} from "../hawk/hk-providers/navigation.service";
import {TranslateService} from "@ngx-translate/core";
import {MediaService} from "@angular/flex-layout";
import {MeGQL} from "../graphql/graphql";
import {pluck} from "rxjs/operators";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'HomePage';

  @ViewChild(Nav) ionNav: Nav;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private navigationService: NavigationService,
    private translate: TranslateService,
    private meGQL: MeGQL,
    private media: MediaService,
  ) {
    this.translate.setDefaultLang('es_AR');

    platform.ready().then(() => {
      statusBar.backgroundColorByHexString('#1976d2');
      splashScreen.hide();

      this.checkAuth();
    });
  }

  ngOnInit() {
    this.navigationService.register(this.ionNav);
  }

  checkAuth() {
    this.meGQL
      .fetch()
      .pipe(pluck('data', 'me'))
      .subscribe((me) => {
        if (! me) {
          this.navigationService.setRoot('LoginPage');
          return;
        }
      });
  }
}

