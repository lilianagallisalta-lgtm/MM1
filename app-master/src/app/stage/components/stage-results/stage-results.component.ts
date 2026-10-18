import {Component, Input, OnInit} from '@angular/core';
import {Area, AreasWithResultGQL, Child, Plan, Result, ResultGQL, Stage} from '../../../../graphql/generated/graphql';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, pluck} from 'rxjs/operators';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-stage-results',
  templateUrl: './stage-results.component.html',
  styleUrls: ['./stage-results.component.scss']
})
export class StageResultsComponent implements OnInit {

  @Input() child: Child;
  @Input() plan: Plan;
  @Input() stage: Stage;

  areas$: Observable<Area[]>;

  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private resultGQL: ResultGQL,
    private areasWithResultGQL: AreasWithResultGQL,
  ) { }

  ngOnInit() {
    this.areas$ = this.areasWithResultGQL
      .fetch({
        planId: this.plan.id,
        childId: this.child.id,
        stageId: this.stage.id,
      }, {
        fetchPolicy: 'network-only',
      })
      .pipe(
        filter(result => result && result.data !== null && typeof result.data !== 'undefined'),
        pluck('data', 'areas', 'data'),
      );
  }

  seeResult(result: Result) {
    this.navCtrl.navigateForward([
      '/children',
      this.child.id,
      'plans',
      this.plan.id,
      'stages',
      this.stage.id,
      'results',
      result.id,
    ]);
  }

}
