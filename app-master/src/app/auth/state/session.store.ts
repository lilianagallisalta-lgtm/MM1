import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import {User, Role} from '../../../graphql/generated/graphql';

export interface SessionState {
   me: User;
   roles: Role[];
}

export function createInitialState(): SessionState {
  return <SessionState> {
    me: null,
    roles: [],
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }

}

