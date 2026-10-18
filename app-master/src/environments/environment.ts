// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
  production: false,
  host: 'localhost:8000',
  graphql: 'http://localhost:8000/graphql',
  isBrowser: true,

  mercadopago: {
    publicKey: 'TEST-9475b70d-2d6a-49c2-aa0f-50e5f19addbb',
  },

  onesignal: {
    appId: '4ed9561b-deae-4247-8f76-28e515d6cbac',
    googleProjectId: '1083951373649',
  },

  googleAnalytics: {
    trackId: '',
  },
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
