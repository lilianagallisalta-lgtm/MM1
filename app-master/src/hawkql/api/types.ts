import {EntityState} from '@datorama/akita';
import {PaginatorInfo} from '../../graphql/generated/graphql';

export interface HawkqlState<E = any, ErrorT = any> extends EntityState<E, ErrorT> {
  paginatorInfo: PaginatorInfo;
}


export enum FetchAllStrategy {
  SET = 1,
  PAGINATE = 2,
}

export interface FetchAllOptions {
  variables?: any;
  strategy?: FetchAllStrategy;
  loading?: boolean;
  page?: number;
  forceFetch?: boolean;
}

export interface PaginateOptions {
  variables?: any;
  strategy?: FetchAllStrategy;
  loading?: boolean;
  page?: number;
}

export interface FetchOneOptions {
  variables?: any;
  loading?: boolean;
  setActive?: boolean;
  forceFetch?: boolean;
}

export interface UpsertOptions {
  input?: any;
  loading?: boolean;
}
