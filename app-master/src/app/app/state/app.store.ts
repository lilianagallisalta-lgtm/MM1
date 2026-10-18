import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface AppState {
   cookieConscent: boolean;
}

export function createInitialState(): AppState {
  return {
    cookieConscent: true,
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'app' })
export class AppStore extends Store<AppState> {

  constructor() {
    super(createInitialState());
  }

  changeCookieConscent(conscent: boolean) {
    this.update(state => ({
      ...state,
      cookieConscent: conscent,
    }));
  }

}

