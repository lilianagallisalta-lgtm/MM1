import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Plan, Result, ResultGQL, Stage} from '../../../../graphql/generated/graphql';
import {ActivatedRoute} from '@angular/router';
import {pluck, tap} from 'rxjs/operators';
import {PlansService} from '../../../plan/state/plans.service';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

  result$: Observable<Result>;

  public childId = this.activatedRoute.snapshot.params['childId'];
  public resultId = this.activatedRoute.snapshot.params['resultId'];
  public planId = this.activatedRoute.snapshot.params['planId'];
  public stageId = this.activatedRoute.snapshot.params['stageId'];

  plan: Plan;
  nextStage: Stage;

  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private resultGQL: ResultGQL,
    private plansService: PlansService,
  ) { }

  ngOnInit() {
    this.plansService
      .fetchOne({planId: this.planId})
      .pipe(
        tap((plan: Plan) => {
          this.plan = plan;
          this.result$ = this.resultGQL
            .fetch({
              id: this.resultId,
              childId: plan.child.id,
            })
            .pipe(pluck('data', 'result'));
          const currentStage = plan.stages.data.find(stage => stage.id === this.stageId);
          const currentStageIdx = plan.stages.data.indexOf(currentStage);
          if (plan.stages.data.length <= currentStageIdx) {
            return;
          }
          this.nextStage = plan.stages.data[currentStageIdx + 1];
        }),
      )
      .subscribe();
  }

  goToNextStage() {
    if (this.nextStage.available === true && this.nextStage.unlocked) {
      this.navCtrl.navigateBack(['/children', this.plan.child.id, 'plans', this.plan.id, 'stages', this.nextStage.id]);
    } else if (this.nextStage.available === false) {
      this.navCtrl.navigateBack(['/children', this.plan.child.id, 'purchase-license']);
    }
  }

}
