import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {GraphQLModule} from './graphql.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IonicStorageModule, Storage} from '@ionic/storage';
import {environment} from '../environments/environment';
import {JWT_OPTIONS, JwtModule} from '@auth0/angular-jwt';
import {SharedModule} from './shared/shared.module';
import {DateFnsConfigurationService, DateFnsModule} from 'ngx-date-fns';
import * as esLocale from 'date-fns/locale/es';
import {GoogleAnalytics} from '@ionic-native/google-analytics/ngx';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';
import {Deeplinks} from '@ionic-native/deeplinks/ngx';
import {OneSignal} from '@ionic-native/onesignal/ngx';

const IONIC_NATIVE_PROVIDERS = [
  StatusBar,
  SplashScreen,
  GoogleAnalytics,
  Deeplinks,
  OneSignal,
];

// JWT
export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => storage.get('token'),
    whitelistedDomains: [
      environment.host,
    ],
  };
}

// date-fns
const esConfig = new DateFnsConfigurationService();
esConfig.setLocale(esLocale);

// ngx-translate
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,

    // ionic
    IonicModule.forRoot({
      mode: 'md',
    }),
    IonicStorageModule.forRoot(),
    AppRoutingModule,

    // apollo
    GraphQLModule,

    // @angular/flex-layout
    FlexLayoutModule,

    // jwt
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage],
      },
    }),

    // @datorama/akita-ngdevtools
    // environment.production ? [] : AkitaNgDevtools.forRoot(),

    // joanllenas/ngx-date-fns
    DateFnsModule.forRoot(),

    // ngx-translate
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
    }),

    // hawk
    SharedModule,
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: DateFnsConfigurationService, useValue: esConfig},
    IONIC_NATIVE_PROVIDERS,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
