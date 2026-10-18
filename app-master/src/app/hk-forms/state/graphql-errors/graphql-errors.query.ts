import {Injectable} from '@angular/core';
import {Query} from '@datorama/akita';
import {GraphqlErrorsState, GraphqlErrorsStore} from './graphql-errors.store';

@Injectable({
  providedIn: 'root'
})
export class GraphqlErrorsQuery extends Query<GraphqlErrorsState> {

  operations$ = this.store._select(state => state.operations);

  constructor(protected store: GraphqlErrorsStore) {
    super(store);
  }

}
