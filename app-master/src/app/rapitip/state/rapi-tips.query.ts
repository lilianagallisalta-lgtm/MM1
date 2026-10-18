import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { RapiTipsStore, RapiTipsState } from './rapi-tips.store';
import {RapiTip} from '../../../graphql/generated/graphql';
import {HawkqlQuery} from '../../../hawkql/api/hawkql-query';

@Injectable({
  providedIn: 'root'
})
export class RapiTipsQuery extends HawkqlQuery<RapiTipsState, RapiTip> {

  constructor(protected store: RapiTipsStore) {
    super(store);
  }

}
