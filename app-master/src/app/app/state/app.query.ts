import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AppStore, AppState } from './app.store';

@Injectable({ providedIn: 'root' })
export class AppQuery extends Query<AppState> {

  cookieConscent$ = this.store._select(state => state.cookieConscent);

  constructor(protected store: AppStore) {
    super(store);
  }

}
