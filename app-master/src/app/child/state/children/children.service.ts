import {Injectable} from '@angular/core';
import {ChildrenStore} from './children.store';
import {Child, UpsertChildInput} from '../../../../graphql/generated/graphql';
import {ChildrenQuery} from './children.query';
import {tap} from 'rxjs/operators';
import {PlansService} from '../../../plan/state/plans.service';
import {FetchAllOptions, FetchOneOptions} from '../../../../hawkql/api/types';

@Injectable({
  providedIn: 'root'
}) export class ChildrenService {

  constructor(
    private childrenStore: ChildrenStore,
    private childrenQuery: ChildrenQuery,
    private plansService: PlansService,
  ) { }

  fetchAll(variables?: any, options?: FetchAllOptions) {
    return this.childrenStore.fetchAll(variables, options);
  }

  refetch() {
    return this.childrenStore.refetch();
  }

  see(item) {
    this.childrenStore.setActive(item.id);
  }

  fetchOne(variables: Child.Variables, options?: FetchOneOptions) {
    return this.childrenStore
      .fetchOne(variables, options)
      .pipe(
        tap((child: Child) => {
          if (child && child.currentPlan) {
            this.plansService.fetchOne({planId: child.currentPlan.id}, options).subscribe();
          }
        }),
      );
  }

  createOrReplace(input: UpsertChildInput) {
    return this.childrenStore.performUpsert(input);
  }

  // fetchStages(variables: any) {
  //   return this.stagesGQL
  //     .fetch(variables, {fetchPolicy: 'network-only'})
  //     .pipe(
  //       pluck('data', 'stages', 'data'),
  //       tap((stages: Stage[]) => {
  //         this.childrenStore.updateRoot(({
  //           stages: stages,
  //         }));
  //       }),
  //     );
  // }

}
