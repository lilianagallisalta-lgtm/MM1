import {Component, OnDestroy} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import gql from "graphql-tag";
import {Apollo, QueryRef} from "apollo-angular";
import {Observable} from "rxjs/Rx";
import {ApolloQueryResult} from "apollo-client";
import {first, take} from "rxjs/internal/operators";
import {LoadingService} from "../../../../hawk/hk-providers/loading.service";
import {of} from "rxjs/index";

const HomePageQuery = gql`
query HomePageQuery {
  me {
    id,
    name,
    picture,
  }
}
`;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html',
})
export class HomePage {
  query: QueryRef<any>;
  data$: Observable<ApolloQueryResult<any>>;
  loading: boolean = true;
  loggedIn: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private apollo: Apollo,
    private loadingService: LoadingService,
  ) {
    this.query = this.apollo
      .watchQuery<any>({
        query: HomePageQuery,
      });

    this.data$ = this.query.valueChanges;

    this.data$.subscribe(({data, loading}) => {
      this.loading = loading;

      if (loading) {
        this.loadingService.present();
      } else {
        this.loadingService.dismiss();
      }
    });
  }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    if (this.query) {
      this.query.refetch();
    }

    this.loggedIn = true;

    this.data$
      .pipe(
        take(1),
        first(),
      )
      .subscribe(({data}) => {
        if (data && data.me && data.me.id) {
          this.navCtrl.setRoot('DashboardPage');

          return;
        } else {
          this.loggedIn = false;
        }
      });
  }

  signup() {
    this.navCtrl.setRoot('SignupPage');
  }

  login() {
    this.navCtrl.setRoot('LoginPage');
  }
}
