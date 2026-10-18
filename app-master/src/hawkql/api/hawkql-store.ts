import {EntityStore, ID} from '@datorama/akita';
import {FetchAllOptions, FetchAllStrategy, FetchOneOptions, UpsertOptions} from './types';
import {Observable} from 'rxjs';
import {ApolloQueryResult} from 'apollo-client';
import {finalize, tap} from 'rxjs/operators';

/**
 * The Root Store that every sub store needs to inherit and
 * invoke `super` with the initial state.
 */
export class HawkqlStore<S, E, ActiveEntity = ID> extends EntityStore<S, E> {

  /**
   * Query para obtener una colección.
   */
  allQuery$: Observable<ApolloQueryResult<any>>;

  /**
   * Opciones por defecto para `fetchAll`.
   */
  defaultFetchAllOptions: FetchAllOptions = {
    strategy: FetchAllStrategy.SET,
    loading: true,
    forceFetch: false,
  };

  /**
   * Query para obtener un ítem.
   */
  oneQuery$: Observable<ApolloQueryResult<any>>;

  /**
   * Opciones por defecto para `fetchOne`.
   */
  defaultFetchOneOptions: FetchOneOptions = {
    loading: true,
    setActive: true,
    forceFetch: false,
  };

  upsertMutation$: any;

  /**
   * Opciones por defecto para `fetchAll`.
   */
  defaultUpsertOptions: UpsertOptions = {
    loading: true,
  };

  fetchAll(variables?: any, options?: FetchAllOptions) {
    options = {
      ...this.defaultFetchAllOptions,
      ...options,
    };

    if (options.loading) {
      this.setLoading(true);
    }

    return this.allQuery$
      .pipe(
        tap((data: any) => {
          if (! data || ! data.data) {
            return;
          }

          switch (options.strategy) {
            case FetchAllStrategy.PAGINATE:
              this.add(data.data);

              if (data.paginatorInfo) {
                this.updateRoot(state => ({
                  ...(state as any),
                  paginatorInfo: data.paginatorInfo,
                }));
              }

              break;

            case FetchAllStrategy.SET:
            default:
              this.set(data.data);

              if (data.paginatorInfo) {
                this.updateRoot(state => ({
                  ...(state as any),
                  paginatorInfo: data.paginatorInfo,
                }));
              }

              break;
          }
        }),
        finalize(() => {
          if (options.loading) {
            this.setLoading(false);
          }
        }),
      );
  }

  // paginate(variables: any, options: PaginateOptions) {
  //   return this.fetchAll(options);
  // }

  fetchOne(variables: any, options: FetchOneOptions = this.defaultFetchOneOptions) {
    options = {
      ...this.defaultFetchOneOptions,
      ...options,
    };

    if (options.loading) {
      this.setLoading(true);
    }

    return this.oneQuery$
      .pipe(
        tap((item: any) => {
          this.createOrReplace(item.id, item);

          if (options.setActive) {
            this.setActive(item.id);
          }
        }),
        finalize(() => {
          if (options.loading) {
            this.setLoading(false);
          }
        }),
      );
  }

  performUpsert(input: any, options?: UpsertOptions) {
    options = {
      ...this.defaultUpsertOptions,
      ...options,
    };

    if (options.loading) {
      this.setLoading(true);
    }

    return this.upsertMutation$
      .pipe(
        tap((item: any) => {
          this.createOrReplace(item.id, item);
        }),
        finalize(() => {
          if (options.loading) {
            this.setLoading(false);
          }
        }),
      );
  }

}
