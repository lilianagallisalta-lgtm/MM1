const hostname = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
const isLocalFrontend = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0';

export const environment = {
  production: false,
  host: hostname,
  graphql: isLocalFrontend ? 'http://127.0.0.1:8000/graphql' : '/graphql',
  isBrowser: true,

  mercadopago: {
    publicKey: 'TEST-9475b70d-2d6a-49c2-aa0f-50e5f19addbb',
  },

  onesignal: {
    appId: '4ed9561b-deae-4247b-28e515d6cbac',
    googleProjectId: '1083951373649',
  },

  googleAnalytics: {
    trackId: '',
  },
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * `ng build --env=prod` then `environment.prod.ts` will be used instead.
 * The list of which env maps to which file can be found in `.angular-cli.json`.
 */
import 'zone.js/dist/zone-error';  // Included with Angular CLI.
