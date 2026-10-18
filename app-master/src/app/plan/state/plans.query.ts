import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { PlansStore, PlansState } from './plans.store';
import {Plan} from '../../../graphql/generated/graphql';
import {HawkqlQuery} from '../../../hawkql/api/hawkql-query';

@Injectable({
  providedIn: 'root'
})
export class PlansQuery extends HawkqlQuery<PlansState, Plan> {

  constructor(protected store: PlansStore) {
    super(store);
  }

}
