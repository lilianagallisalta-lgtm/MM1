import { Injectable } from '@angular/core';
import {coerceArray, Query} from '@datorama/akita';
import { SessionStore, SessionState } from './session.store';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../../../graphql/generated/graphql';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {

  me$: Observable<User> = this.sessionStore._select(state => state.me);

  constructor(
    private sessionStore: SessionStore,
  ) {
    super(sessionStore);
  }

  /**
   * Chequea que el usuario logueado tenga AL MENOS UN rol.
   * @param roles
   */
  hasRoles(roles: string[] | string): Observable<boolean> {
    const asArray = coerceArray(roles);

    return this.select(state => state.roles)
      .pipe(
        map((userRoles: any) => {
          if (! userRoles) {
            return false;
          }

          let hasRole: boolean = false;

          asArray.forEach(current => {
            userRoles.forEach(userRole => {
              if (userRole.name === current) {
                hasRole = true;
              }
            });
          });

          return hasRole;
        }),
      );
  }

}
