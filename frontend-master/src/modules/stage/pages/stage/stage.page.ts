import {Component, OnDestroy} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {
  AnswerGQL,
  AnswerOption,
  Question
} from "../../../../graphql/graphql";
import {untilDestroyed} from "ngx-take-until-destroy";
import {animate, style, transition, trigger} from "@angular/animations";
import {StageQuestionsStore} from "../../state/stageQuestions.store";
import {StageQuestionsQuery} from "../../state/stageQuestions.query";

@IonicPage({
  segment: 'children/:childId/stages/:stageId',
  defaultHistory: [
    'DashboardPage',
  ],
})
@Component({
  selector: 'page-stage',
  templateUrl: 'stage.page.html',
  animations: [
    trigger('question', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(-100%) scale(1.2)',
        }),
        animate("300ms ease-in-out", style({
          opacity: 1,
          transform: 'translateY(0) scale(1)',
        }))
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'translateY(0) scale(1)',
        }),
        animate("300ms ease-in-out", style({
          opacity: 0,
          transform: 'translateY(100%) scale(0.8)',
        })),
      ]),
    ]),
  ],
})
export class StagePage implements OnDestroy {
  stage$ = this.stageQuestionsQuery.stage$;
  child$ = this.stageQuestionsQuery.child$;
  nextQuestion$ = this.stageQuestionsQuery.nextQuestion$;
  answerOptions$ = this.stageQuestionsQuery.answerOptions$;
  currentQuestion: Question;

  loading: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private answerGQL: AnswerGQL,
    private stageQuestionsStore: StageQuestionsStore,
    private stageQuestionsQuery: StageQuestionsQuery,
  ) {
    this.stageQuestionsStore.init(this.navParams.get('stageId'), this.navParams.get('childId'));

    this.nextQuestion$
      .pipe(
        untilDestroyed(this),
      )
      .subscribe((question: Question) => {
        this.loading = false;
        this.setCurrentQuestion(question);
      });
  }

  ionViewDidLoad() { }

  ngOnDestroy() { }

  answer(answerOption: AnswerOption) {
    if (! this.currentQuestion) {
      return;
    }

    this.loading = true;

    this.answerGQL
      .mutate({
        input: {
          childId: this.navParams.get('childId'),
          questionId: this.currentQuestion.id,
          answerOptionId: answerOption.id,
        }
      })
      .subscribe(() => {
        this.stageQuestionsStore.fetchStage();

        this.stageQuestionsStore.fetchNextQuestion();
      });
  }

  changeQuestion(question: Question) {
    if (! question.answered && ! question.isNextQuestion) {
      return;
    }

    this.stageQuestionsStore.changeQuestion(question);
  }

  setCurrentQuestion(question: Question) {
    this.currentQuestion = null;

    setTimeout(() => {
      this.currentQuestion = question;
    }, 400);
  }

  seeResults() {
    this.navCtrl.push('ResultsPage', {
      stageId: this.navParams.get('stageId'),
      childId: this.navParams.get('childId'),
    });
  }
}
