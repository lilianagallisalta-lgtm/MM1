import {Injectable} from "@angular/core";
import {Store, StoreConfig} from "@datorama/akita";
import {
  AnswerGQL,
  AnswerOption, AnswerOptionsGQL,
  Child, ChildGQL, NextQuestionGQL,
  Question,
  Stage,
  StagePageGQL
} from "../../../graphql/graphql";
import {first, pluck} from "rxjs/operators";
import {untilDestroyed} from "ngx-take-until-destroy";

export interface StageQuestionsModel {
  stageId: string,
  childId: string,
  questions: Question[],
  nextQuestion: Question,
  stage: Stage,
  child: Child,
  answerOptions: AnswerOption[],
  loading: boolean;
}

const initialState = {
  loading: false,
};

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'stageQuestions' })
export class StageQuestionsStore extends Store<StageQuestionsModel> {

  constructor(
    private stagePageGQL: StagePageGQL,
    private nextQuestionGQL: NextQuestionGQL,
    private answerOptionsGQL: AnswerOptionsGQL,
    private answerGQL: AnswerGQL,
    private childGQL: ChildGQL,
  ) {
    super(initialState);
  }

  init(stageId: any, childId: any) {
    this.update(store => {
      return {
        ...store,
        stageId: stageId,
        childId: childId,
        loading: true,
      };
    });

    this.fetchStage();

    this.childGQL
      .watch({
        id: childId,
      })
      .valueChanges
      .pipe(
        untilDestroyed(this),
        pluck('data', 'child'),
      )
      .subscribe((child: Child) => {
        this.update(store => {
          return {
            ...store,
            child: child,
          }
        });
      });

    this.answerOptionsGQL
      .watch()
      .valueChanges
      .pipe(
        untilDestroyed(this),
        pluck('data', 'answerOptions', 'data'),
      )
      .subscribe((answerOptions: AnswerOption[]) => {
        this.update(store => {
          return {
            ...store,
            answerOptions: answerOptions,
          };
        });
      });

    this.fetchNextQuestion();
  }

  fetchStage() {
    this._select(s => s)
      .pipe(
        first(),
      )
      .subscribe((store) => {
        this.stagePageGQL
          .fetch({
            id: store.stageId,
            childId: store.childId,
          }, {
            fetchPolicy: 'network-only',
          })
          .pipe(
            pluck('data', 'stage'),
          )
          .subscribe((stage: Stage) => {
            this.update(store => {
              return {
                ...store,
                stage: stage,
              };
            });
          });
      });
  }

  fetchNextQuestion() {
    this._select(s => s)
      .pipe(
        first(),
      )
      .subscribe((store) => {
        this.nextQuestionGQL
          .watch({
            stageId: store.stageId,
            childId: store.childId,
          }, {
            fetchPolicy: 'network-only',
          })
          .valueChanges
          .pipe(
            untilDestroyed(this),
            pluck('data', 'nextQuestion'),
          )
          .subscribe((question: Question) => {
            console.debug('nextQuestion$', question);

            this.update(store => {
              return {
                ...store,
                nextQuestion: question,
              };
            });
          });
      });
  }

  changeQuestion(question: Question) {
    this.update(store => {
      return {
        ...store,
        nextQuestion: question,
      };
    });
  }
}
