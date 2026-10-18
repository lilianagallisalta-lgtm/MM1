import {QueryEntity} from '@datorama/akita';
import {Injectable} from "@angular/core";
import {Child} from "../../../graphql/graphql";
import {ChildrenState, ChildrenStore} from "./children.store";

@Injectable({
  providedIn: 'root',
})
export class ChildrenQuery extends QueryEntity<ChildrenState, Child> {
  constructor(protected store: ChildrenStore) {
    super(store);
  }
}
