import {Component, OnDestroy, OnInit} from '@angular/core';
import {StageQuestionsQuery} from '../../../stage/state/stageQuestions/stageQuestions.query';
import {AnswerGQL, Plan, Stage} from '../../../../graphql/generated/graphql';
import {StageQuestionsStore} from '../../../stage/state/stageQuestions/stageQuestions.store';
import {StageQuestionsService} from '../../../stage/state/stageQuestions/stageQuestions.service';
import {ActivatedRoute} from '@angular/router';
import {pairwise} from 'rxjs/operators';
import {ChildrenService} from '../../state/children/children.service';
import {combineLatest} from 'rxjs';
import {ChildrenQuery} from '../../state/children/children.query';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {NavController} from '@ionic/angular';
import {PlansService} from '../../../plan/state/plans.service';

@Component({
  selector: 'app-child-stage',
  templateUrl: './child-stage.page.html',
  styleUrls: ['./child-stage.page.scss'],
})
export class ChildStagePage implements OnInit, OnDestroy {


  public childId = this.activatedRoute.snapshot.params['childId'];
  public planId = this.activatedRoute.snapshot.params['planId'];
  public stageId = this.activatedRoute.snapshot.params['stageId'];

  child$ = this.stageQuestionsQuery.child$;
  stage$ = this.stageQuestionsQuery.stage$;
  plan$ = this.stageQuestionsQuery.plan$;

  nextStage: Stage;

  constructor(
    private navCtrl: NavController,
    public activatedRoute: ActivatedRoute,
    private answerGQL: AnswerGQL,
    private stageQuestionsStore: StageQuestionsStore,
    private stageQuestionsQuery: StageQuestionsQuery,
    private stageQuestionsService: StageQuestionsService,
    private childrenService: ChildrenService,
    private childrenQuery: ChildrenQuery,
    private plansService: PlansService,
  ) {
    this.plansService.fetchOne({planId: this.planId}).subscribe();
    this.stageQuestionsService.init(this.stageId, this.planId);

    // Busca la siguiente etapa.
    // combineLatest([
    //     this.stage$,
    //     this.plan$,
    //   ])
    //   .pipe(untilDestroyed(this))
    //   .subscribe((data) => {
    //     if (! data || ! data[0] || ! data[1]) {
    //       return;
    //     }
    //
    //     const stage: Stage = data[0];
    //     const plan: Plan = data[1];
    //
    //     if (! stage || ! plan || ! plan.stages || ! plan.stages.data) {
    //       return;
    //     }
    //
    //     const filtered = plan.stages.data.filter(s => s.slug === stage.slug + 1);
    //     this.nextStage = filtered.length ? filtered[0] : null;
    //   });
    this.plan$.pipe(untilDestroyed(this)).subscribe((plan: Plan) => {
      if (! plan) {
        return;
      }
      const currentStage = plan.stages.data.find(stage => stage.id === this.stageId);
      const currentStageIdx = plan.stages.data.indexOf(currentStage);
      if (plan.stages.data.length <= currentStageIdx) {
        return;
      }
      this.nextStage = plan.stages.data[currentStageIdx + 1];
    });

    // Si la estapa pasó de no estar completada a estar completada, se trae de nuevo
    // el niño, ya que los datos de sus etapas habrán cambiado (el `unlocked, por ej.).
    this.stage$.pipe(pairwise(), untilDestroyed(this)).subscribe((pair) => {
      if (! pair || ! pair[0] || ! pair[1]) {
        return;
      }
      if (pair[0].progress < 1 && pair[1].progress === 1) {
        this.stageQuestionsService.stageCompleted(this.childId, this.planId, this.stageId);
      }
    });
  }

  ngOnInit() { }

  ngOnDestroy() { }

  goToNextStage() {
    if (this.nextStage.available === true && this.nextStage.unlocked) {
      this.navCtrl.navigateBack(['/children', this.childId, 'plans', this.planId, 'stages', this.nextStage.id]);
    } else if (this.nextStage.available === false) {
      this.navCtrl.navigateBack(['/children', this.childId, 'purchase-license']);
    }
  }

}
