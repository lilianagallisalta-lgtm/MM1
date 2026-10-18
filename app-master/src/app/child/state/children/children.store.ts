import {EntityState, StoreConfig} from '@datorama/akita';
import {Injectable} from '@angular/core';
import {filter, pluck} from 'rxjs/operators';
import {HawkqlStore} from '../../../../hawkql/api/hawkql-store';
import {Child, ChildGQL, ChildQueryArgs, Children, ChildrenGQL, Stage, UpsertChildGQL, UpsertChildInput} from '../../../../graphql/generated/graphql';
import {FetchAllOptions, FetchOneOptions, UpsertOptions} from '../../../../hawkql/api/types';

export interface ChildrenState extends EntityState<Child> {
  stages: Stage[];
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'children' })
export class ChildrenStore extends HawkqlStore<ChildrenState, Child> {

  constructor(
    private childrenGQL: ChildrenGQL,
    private childGQL: ChildGQL,
    private upsertChildGQL: UpsertChildGQL,
  ) {
    super({});
  }

  fetchAll(variables: Children.Variables = {}, options?: FetchAllOptions) {
    this.allQuery$ = this.childrenGQL
      .fetch(variables, options && options.forceFetch ? {fetchPolicy: 'network-only'} : {})
      .pipe(
        filter(result => result && result.data !== null && typeof result.data !== 'undefined'),
        pluck('data', 'children'),
      );
    return super.fetchAll(options);
  }

  refetch(options?: FetchAllOptions) {
    this.allQuery$ = this.childrenGQL
      .fetch({}, {fetchPolicy: 'network-only'})
      .pipe(
        filter(result => result && result.data !== null && typeof result.data !== 'undefined'),
        pluck('data', 'children'),
      );
    return super.fetchAll(options);
  }

  fetchOne(variables: Child.Variables, options?: FetchOneOptions) {
    this.oneQuery$ = this.childGQL
      .fetch(variables, {fetchPolicy: 'network-only'})
      .pipe(
        filter(result => result && result.data !== null && typeof result.data !== 'undefined'),
        pluck('data', 'child'),
      );
    return super.fetchOne(variables, options);
      // .pipe(
      //   tap((child: Child) => {
      //     this.updateRoot(({
      //       stages: child && child.stages ? child.stages.data : [],
      //     }));
      //   }),
      // );
  }

  performUpsert(input: UpsertChildInput, options?: UpsertOptions) {
    this.upsertMutation$ = this.upsertChildGQL
      .mutate({
        input: input,
      })
      .pipe(
        pluck('data', 'upsertChild'),
      );
    return super.performUpsert(options);
  }

}
