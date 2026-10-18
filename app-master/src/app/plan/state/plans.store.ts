import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import {CreatePlanGQL, CreatePlanInput, Plan, PlanGQL, Plans, PlansGQL} from '../../../graphql/generated/graphql';
import {HawkqlStore} from '../../../hawkql/api/hawkql-store';
import {FetchAllOptions, FetchOneOptions, UpsertOptions} from '../../../hawkql/api/types';
import {Observable} from 'rxjs';
import {filter, pluck} from 'rxjs/operators';

export interface PlansState extends EntityState<Plan> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'plans' })
export class PlansStore extends HawkqlStore<PlansState, Plan> {

  constructor(
    private planGQL: PlanGQL,
    private plansGQL: PlansGQL,
    private createPlanGQL: CreatePlanGQL,
  ) {
    super();
  }

  fetchOne(variables: Plan.Variables, options: FetchOneOptions = this.defaultFetchOneOptions): Observable<any> {
    this.oneQuery$ = this.planGQL
      .fetch(variables, options && options.forceFetch ? {'fetchPolicy': 'network-only'} : {})
      .pipe(
        filter(result => result && result.data !== null && typeof result.data !== 'undefined'),
        pluck('data', 'plan')
      );
    return super.fetchOne(variables, options);
  }

  fetchAll(variables?: Plans.Variables, options?: FetchAllOptions): Observable<any> {
    this.allQuery$ = this.plansGQL
      .fetch(variables, options && options.forceFetch ? {'fetchPolicy': 'network-only'} : {})
      .pipe(
        filter(result => result && result.data !== null && typeof result.data !== 'undefined'),
        pluck('data', 'plans')
      );
    return super.fetchAll(variables, options);
  }

  performUpsert(input: CreatePlanInput, options?: UpsertOptions): Observable<any> {
    this.upsertMutation$ = this.createPlanGQL
      .mutate({
        input: input,
      })
      .pipe(
        pluck('data', 'createPlan'),
      );
    return super.performUpsert(input, options);
  }

}
