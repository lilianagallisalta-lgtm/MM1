import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {Observable} from "rxjs/Observable";
import {ChildGQL} from "../../../../graphql/graphql";
import {pluck} from "rxjs/operators";

@IonicPage({
  segment: 'childEdits/:childId',
  defaultHistory: [
    'DashboardPage',
  ],
})
@Component({
  selector: 'page-child-edit',
  templateUrl: 'child-edit.page.html',
})
export class ChildEditPage {
  child$: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private childGQL: ChildGQL,
  ) {
    this.child$ = this.childGQL
      .watch({
        id: this.navParams.get('childId'),
      })
      .valueChanges
      .pipe(
        pluck('data', 'child'),
      );
  }

  ionViewDidLoad() {
  }
}
