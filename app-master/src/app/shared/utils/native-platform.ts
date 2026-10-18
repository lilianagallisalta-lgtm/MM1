export function isNativeCordovaPlatform(): boolean {
  const platformId = window['cordova'] && window['cordova'].platformId;
  return platformId === 'android' || platformId === 'ios';
}
