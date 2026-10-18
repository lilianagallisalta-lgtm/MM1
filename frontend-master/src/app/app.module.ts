import { BrowserModule } from '@angular/platform-browser';
import {ErrorHandler, Injector, NgModule} from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {IonicStorageModule, Storage} from "@ionic/storage";
import {
  API_URL, ApiService, BASE_URL,
  IS_LOCAL
} from "../hawk/hk-api/api.service";
import {PopoverService} from "../hawk/hk-providers/popover.service";
import {NavigationService} from "../hawk/hk-providers/navigation.service";
import {ToastService} from "../hawk/hk-providers/toast.service";
import {JWT_OPTIONS, JwtModule} from "@auth0/angular-jwt";
import {APOLLO_OPTIONS, ApolloModule} from "apollo-angular";
import {HttpLink, HttpLinkModule} from "apollo-angular-link-http";
import {FlexLayoutModule} from "@angular/flex-layout";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {TranslateLoader, TranslateModule,} from "@ngx-translate/core";
import {InMemoryCache} from "apollo-cache-inmemory";
import {AppErrorHandler} from "./providers/app-error-handler";
import {setContext} from "apollo-link-context";
import {MeMenuComponentModule} from "../modules/auth/components/me-menu/me-menu.component.module";
import {LoadingService} from "../hawk/hk-providers/loading.service";
import { onError } from "apollo-link-error";

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, IS_LOCAL ? API_URL + 'i18n/' : '');
}

// JWT
let storage = new Storage({});
export function jwtOptionsFactory() {
  return {
    tokenGetter: () => storage.get('token'),
    whitelistedDomains: [
      'localhost:8000',
      '192.168.1.3:8000',
      'mentesmejorando.hawk-srl.com',
    ],
  }
}

const IONIC_NATIVE_PROVIDERS = [
  StatusBar,
  SplashScreen,
];

const SHARED_PROVIDERS = [
  ApiService,
  PopoverService,
  ToastService,
  NavigationService,
  LoadingService,
];

const MODULE_PROVIDERS = [
];

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),

    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory
      },
    }),

    // @angular/flex-layout
    FlexLayoutModule,

    // apollo
    ApolloModule,
    HttpLinkModule,

    // ngx-translate
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),

    MeMenuComponentModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler,
    },

    IONIC_NATIVE_PROVIDERS,
    SHARED_PROVIDERS,
    MODULE_PROVIDERS,

    // apollo
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink, toast: ToastService) => {
        const http = httpLink.create({
          uri: BASE_URL + 'graphql',
        });

        const errorLink = onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors) {
            graphQLErrors
              .map(({ message }) => {
                try {
                  const validationErrors = JSON.parse(message);

                  const firstErrorKey = Object.keys(validationErrors.errors)[0];

                  toast.error(validationErrors.errors[firstErrorKey][0].message);
                } catch (e) {

                }
              });
          }

          if (networkError) {
            console.log(`[Network error]: ${networkError}`);
          }
        });

        const jwtAuth = setContext((_, { headers }) => {
          storage.get('token').then(token => {
            return {
              headers: {
                ...headers,
                authorization: token ? `Bearer ${token}` : null,
              }
            }
          });
        });

        return {
          link: jwtAuth.concat(errorLink.concat(http)),
          cache: new InMemoryCache(),
          defaultOptions: {
            watchQuery: {
              errorPolicy: 'all'
            },
            query: {
              errorPolicy: 'all',
            },
          }
        };
      },
      deps: [HttpLink, ToastService],
    },
  ]
})

export class AppModule {
  static injector: Injector;

  constructor(
    injector: Injector,
  ) {
    AppModule.injector = injector;
  }
}
