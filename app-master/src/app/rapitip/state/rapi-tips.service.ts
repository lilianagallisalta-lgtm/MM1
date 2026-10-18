import {Injectable} from '@angular/core';
import {RapiTipsStore} from './rapi-tips.store';
import {RapiTip, RapiTips} from '../../../graphql/generated/graphql';
import {FetchAllOptions, FetchOneOptions} from '../../../hawkql/api/types';

@Injectable({ providedIn: 'root' })
export class RapiTipsService {

  constructor(
    private rapiTipsStore: RapiTipsStore,
  ) {
  }

  fetchAll(variables: RapiTips.Variables, options?: FetchAllOptions) {
    return this.rapiTipsStore.fetchAll(variables, options);
  }

  fetchOne(variables: RapiTip.Variables, options?: FetchOneOptions) {
    return this.rapiTipsStore.fetchOne(variables, options);
  }

  setActive(id: string) {
    return this.rapiTipsStore.setActive(id);
  }

}
