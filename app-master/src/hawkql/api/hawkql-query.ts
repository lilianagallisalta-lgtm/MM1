import {EntityState, HashMap, ID, QueryEntity, SelectOptions} from '@datorama/akita';
import {Observable} from 'rxjs';
import {PaginatorInfo} from '../../graphql/generated/graphql';

export class HawkqlQuery<S extends EntityState, E, ActiveEntity = ID> extends QueryEntity<S, E, ActiveEntity> {

  selectPaginatorInfo(): Observable<PaginatorInfo> {
    return this.select(s => s.paginatorInfo);
  }

}
