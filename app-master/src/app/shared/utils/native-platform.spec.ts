import {isNativeCordovaPlatform} from './native-platform';

describe('isNativeCordovaPlatform', () => {
  let originalCordova: {platformId?: string};

  beforeEach(() => {
    originalCordova = window['cordova'];
  });

  afterEach(() => {
    if (originalCordova) {
      window['cordova'] = originalCordova;
    } else {
      delete window['cordova'];
    }
  });

  it('returns false when Cordova is not available', () => {
    delete window['cordova'];

    expect(isNativeCordovaPlatform()).toBe(false);
  });

  it('returns false in the Cordova browser platform', () => {
    window['cordova'] = {platformId: 'browser'};

    expect(isNativeCordovaPlatform()).toBe(false);
  });

  it('returns true on Android', () => {
    window['cordova'] = {platformId: 'android'};

    expect(isNativeCordovaPlatform()).toBe(true);
  });

  it('returns true on iOS', () => {
    window['cordova'] = {platformId: 'ios'};

    expect(isNativeCordovaPlatform()).toBe(true);
  });
});
