import {EntityState, EntityStore, StoreConfig} from '@datorama/akita';
import {Injectable} from "@angular/core";
import {
  Child, ChildrenGQL,
} from "../../../graphql/graphql";
import {pluck} from "rxjs/operators";

export interface ChildrenState extends EntityState<Child> {}​

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'children' })
export class ChildrenStore extends EntityStore<ChildrenState, Child> {

  constructor(
    private childrenGQL: ChildrenGQL,
  ) {
    super({});
  }

  fetchAll() {
    this.childrenGQL
      .fetch()
      .pipe(
        pluck('data', 'children'),
      )
      .subscribe(({data}) => {
        this.set(data);
      });
  }

  refetch() {
    this.childrenGQL
      .fetch({}, {
        fetchPolicy: 'network-only',
      })
      .pipe(
        pluck('data', 'children'),
      )
      .subscribe(({data}) => {
        this.set(data);
      });
  }
}
