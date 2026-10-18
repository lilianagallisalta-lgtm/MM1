import {Component, OnInit, OnDestroy} from "@angular/core";
import gql from "graphql-tag";
import {Apollo, QueryRef} from "apollo-angular";
import {Observable} from "rxjs/Rx";
import {ApolloQueryResult} from "apollo-client";
import {Storage} from "@ionic/storage";

const MeComponentQuery = gql`
query MeComponentQuery {
  me {
    id,
    name,
    picture,
    email,
  }
}
`;

@Component({
  selector: 'me',
  templateUrl: 'me.component.html'
})
export class MeComponent implements OnInit {
  query: QueryRef<any>;
  data$: Observable<ApolloQueryResult<any>>;

  constructor(
    private apollo: Apollo,
    private storage: Storage,
  ) {
    this.query = this.apollo
      .watchQuery<any>({
        query: MeComponentQuery,
      });

    this.data$ = this.query.valueChanges;
  }

  ngOnInit() {
  }
}
