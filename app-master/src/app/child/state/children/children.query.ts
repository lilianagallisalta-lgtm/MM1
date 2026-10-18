import {QueryEntity} from '@datorama/akita';
import {Injectable} from '@angular/core';
import {ChildrenState, ChildrenStore} from './children.store';
import {Child} from '../../../../graphql/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class ChildrenQuery extends QueryEntity<ChildrenState, Child> {

  stages$ = this.store._select(s => s.stages);

  constructor(protected store: ChildrenStore) {
    super(store);
  }

}
