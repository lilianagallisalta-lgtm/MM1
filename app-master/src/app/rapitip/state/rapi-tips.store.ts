import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import {RapiTip, RapiTipGQL, RapiTips, RapiTipsGQL} from '../../../graphql/generated/graphql';
import {HawkqlStore} from '../../../hawkql/api/hawkql-store';
import {FetchAllOptions, FetchOneOptions} from '../../../hawkql/api/types';
import {Observable} from 'rxjs';
import {pluck} from 'rxjs/operators';

export interface RapiTipsState extends EntityState<RapiTip> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'rapiTips' })
export class RapiTipsStore extends HawkqlStore<RapiTipsState, RapiTip> {

  constructor(
    private rapiTipsGQL: RapiTipsGQL,
    private rapiTipGQL: RapiTipGQL,
  ) {
    super();
  }

  fetchAll(variables?: RapiTips.Variables, options?: FetchAllOptions): Observable<any> {
    this.allQuery$ = this.rapiTipsGQL
      .fetch(variables)
      .pipe(pluck('data', 'rapiTips'));
    return super.fetchAll(variables, options);
  }

  fetchOne(variables: RapiTip.Variables, options: FetchOneOptions = this.defaultFetchOneOptions): Observable<any> {
    this.oneQuery$ = this.rapiTipGQL
      .fetch(variables)
      .pipe(pluck('data', 'rapiTip'));
    return super.fetchOne(variables, options);
  }

}

