import {Injectable} from '@angular/core';
import {PlansStore} from './plans.store';
import {CreatePlanInput, Plan, Plans} from '../../../graphql/generated/graphql';
import {FetchAllOptions, FetchOneOptions} from '../../../hawkql/api/types';

@Injectable({ providedIn: 'root' })
export class PlansService {

  constructor(
    private plansStore: PlansStore,
  ) {
  }

  fetchAllByChild(variables: Plans.Variables, options?: FetchAllOptions) {
    return this.plansStore.fetchAll(variables, options);
  }

  fetchOne(variables: Plan.Variables, options?: FetchOneOptions) {
    return this.plansStore.fetchOne(variables, options);
  }

  performUpsert(input: CreatePlanInput) {
    return this.plansStore.performUpsert(input);
  }

}
