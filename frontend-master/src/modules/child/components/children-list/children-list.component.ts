import {Component, OnInit} from "@angular/core";
import {Observable} from "rxjs/Rx";
import {Apollo} from "apollo-angular";
import {NavigationService} from "../../../../hawk/hk-providers/navigation.service";
import {ChildrenStore} from "../../state/children.store";
import {ChildrenQuery} from "../../state/children.query";
import {Child,} from "../../../../graphql/graphql";

@Component({
  selector: 'children-list',
  templateUrl: 'children-list.component.html',
})
export class ChildrenListComponent implements OnInit {
  children$: Observable<Child[]> = this.childrenQuery.selectAll();

  constructor(
    private apollo: Apollo,
    private navigationService: NavigationService,
    private childrenStore: ChildrenStore,
    public childrenQuery: ChildrenQuery,
  ) {
    this.childrenStore.fetchAll();

    this.children$.subscribe(data => console.debug('children$', data));
  }

  ngOnInit() {
  }

  create() {
    this.navigationService.push('ChildCreatePage');
  }

  see(child) {
    this.navigationService.push('ChildPage', {
      childId: child.id,
    });
  }
}
