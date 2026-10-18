import { Injectable } from '@angular/core';
import {EntityState, Store, StoreConfig} from '@datorama/akita';
import { GraphqlError } from './graphql-error.model';

export interface HawkqlError {
  key: string;
  display: string;
  rule: string;
}

export interface HawkqlOperation {
  name: string;
  errors: any[];
}

export interface GraphqlErrorsState extends EntityState<GraphqlError> {
  operations: HawkqlOperation[];
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'graphql-errors' })
export class GraphqlErrorsStore extends Store<GraphqlErrorsState> {

  constructor() {
    super({
      operations: [],
    });
  }

}

