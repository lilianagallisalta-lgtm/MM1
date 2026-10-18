import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {Observable} from "rxjs/Observable";
import {Child, ChildGQL, Stage, StagesGQL} from "../../../../graphql/graphql";
import {first, pluck} from "rxjs/operators";

@IonicPage({
  segment: 'children/:childId',
  defaultHistory: [
    'DashboardPage',
  ],
})
@Component({
  selector: 'page-child',
  templateUrl: 'child.page.html',
})
export class ChildPage {
  child$: Observable<any>;
  stages$: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private childGQL: ChildGQL,
    private stagesGQL: StagesGQL,
  ) {
    this.child$ = this.childGQL
      .watch({
        id: this.navParams.get('childId'),
      })
      .valueChanges
      .pipe(
        pluck('data', 'child'),
      );

    this.stages$ = this.stagesGQL
      .watch({
        childId: this.navParams.get('childId'),
      })
      .valueChanges
      .pipe(
        pluck('data', 'stages', 'data'),
      );
  }

  ionViewDidLoad() {
  }

  upsert() {
    this.child$.pipe(first()).subscribe((child: Child) => {
      this.navCtrl.push('ChildEditPage', {
        childId: child.id,
      });
    });
  }

  seeStage(stage: Stage) {
    if (! stage.available) {
      // TODO: Mostrar popup de suscripción.
      return;
    }

    this.child$.pipe(first()).subscribe((child: Child) => {
      if (stage.progress >= 1) {
        this.navCtrl.push('ResultsPage', {
          stageId: stage.id,
          childId: child.id,
        });
      } else {
        this.navCtrl.push('StagePage', {
          stageId: stage.id,
          childId: child.id,
        });
      }
    });
  }
}
