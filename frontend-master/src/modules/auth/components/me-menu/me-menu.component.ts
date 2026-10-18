import {Component, OnInit, OnDestroy} from "@angular/core";
import {Apollo, QueryRef} from "apollo-angular";
import {Observable} from "rxjs/Rx";
import {ApolloQueryResult} from "apollo-client";
import {Storage} from "@ionic/storage";
import gql from "graphql-tag";
import {NavigationService} from "../../../../hawk/hk-providers/navigation.service";
import {LoadingService} from "../../../../hawk/hk-providers/loading.service";
import {MenuController} from "ionic-angular";

const MeMenuComponentQuery = gql`
query MeMenuComponentQuery {
  me {
    id,
    name,
    picture,
    email,
  }
}
`;

@Component({
  selector: 'me-menu',
  templateUrl: 'me-menu.component.html'
})
export class MeMenuComponent implements OnInit {
  query: QueryRef<any>;
  data$: Observable<ApolloQueryResult<any>>;

  constructor(
    private navigationService: NavigationService,
    private apollo: Apollo,
    private storage: Storage,
    private loadingService: LoadingService,
    private menuCtrl: MenuController,
  ) {
    this.query = this.apollo
      .watchQuery<any>({
        query: MeMenuComponentQuery,
      });

    this.data$ = this.query.valueChanges;
  }

  ngOnInit() {
  }

  logout() {
    this.menuCtrl.close();

    this.loadingService.present();

    this.storage.remove('token').then(() => {
      this.apollo.getClient().clearStore().then(() => {
        this.navigationService.setRoot('HomePage');

        this.loadingService.dismiss();
      });
    }, () => {
      this.loadingService.dismiss();
    });
  }
}
