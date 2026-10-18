import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnswerOption, Question} from '../../../../graphql/generated/graphql';
import {StageQuestionsQuery} from '../../state/stageQuestions/stageQuestions.query';
import {StageQuestionsService} from '../../state/stageQuestions/stageQuestions.service';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {animate, style, transition, trigger} from '@angular/animations';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-do-stage',
  templateUrl: './do-stage.component.html',
  styleUrls: ['./do-stage.component.scss'],
  animations: [
    trigger('question', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-100%) scale(1.2)',
        }),
        animate('300ms ease-in-out', style({
          opacity: 1,
          transform: 'translateY(0) scale(1)',
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'translateY(0) scale(1)',
        }),
        animate('300ms ease-in-out', style({
          opacity: 0,
          transform: 'translateY(100%) scale(0.8)',
        })),
      ]),
    ]),
  ],
})
export class DoStageComponent implements OnInit, OnDestroy {

  stage$ = this.stageQuestionsQuery.stage$;
  child$ = this.stageQuestionsQuery.child$;
  answerOptions$ = this.stageQuestionsQuery.answerOptions$;
  questionActive$ = this.stageQuestionsQuery.selectActive();
  questionActive: Question;
  loading$ = this.stageQuestionsQuery.selectLoading();

  showWalkthrough: boolean = false;

  constructor(
    private stageQuestionsQuery: StageQuestionsQuery,
    private stageQuestionsService: StageQuestionsService,
    private storage: Storage,
  ) { }

  async ngOnInit() {
    this.questionActive$
      .pipe(
        untilDestroyed(this),
      )
      .subscribe((question: Question) => {
        if (! question) {
          return;
        }

        this.setCurrentQuestion(question);
      });

    this.showWalkthrough = await this.storage.get('stagesWalkthroughConfirmed') !== true;
  }

  ngOnDestroy() { }

  setCurrentQuestion(question: Question) {
    this.questionActive = null;

    setTimeout(() => {
      this.questionActive = question;
    }, 400);
  }

  answer(answerOption: AnswerOption) {
    if (! this.questionActive) {
      return;
    }

    this.stageQuestionsService
      .answer(this.questionActive, answerOption)
      .subscribe();
  }

  async walkthroughCompleted() {
    await this.storage.set('stagesWalkthroughConfirmed', true);
    this.showWalkthrough = false;
  }

}
