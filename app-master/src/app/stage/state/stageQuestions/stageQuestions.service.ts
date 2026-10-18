import {Injectable} from '@angular/core';
import {combineLatest} from 'rxjs';
import {finalize, first, pluck, switchMap, tap} from 'rxjs/operators';
import {AnswerGQL, AnswerOption, AnswerOptionsGQL, NextQuestionGQL, Plan, PlanGQL, Question, QuestionGQL, Stage, StagePageGQL, StageWithProgressGQL} from '../../../../graphql/generated/graphql';
import {StageQuestionsStore} from './stageQuestions.store';
import {PlansService} from '../../../plan/state/plans.service';
import {ChildrenService} from '../../../child/state/children/children.service';

@Injectable({
  providedIn: 'root',
})
export class StageQuestionsService {

  constructor(
    private stageQuestionsStore: StageQuestionsStore,
    private stagePageGQL: StagePageGQL,
    private nextQuestionGQL: NextQuestionGQL,
    private answerOptionsGQL: AnswerOptionsGQL,
    private answerGQL: AnswerGQL,
    private planGQL: PlanGQL,
    private questionGQL: QuestionGQL,
    private stageWithProgressGQL: StageWithProgressGQL,
    private plansService: PlansService,
    private childrenService: ChildrenService,
  ) { }

  init(stageId: any, planId: any) {
    this.stageQuestionsStore.updateRoot(state => ({
      loading: true,
      stage: null,
      child: null,
      plan: null,
      nextQuestion: null,
      stageId: stageId,
      planId: planId,
    }));

    combineLatest([
        this.fetchStageWithQuestions(stageId, planId),
        this.fetchAnswerOptions(),
        this.fetchPlan(planId),
        this.fetchNextQuestion(),
      ])
      .pipe(first())
      .subscribe(() => {
        this.stageQuestionsStore.setLoading(false);
      });
  }

  private fetchPlan(planId: string) {
    return this.planGQL
      .watch({
        planId: planId,
      })
      .valueChanges
      .pipe(
        pluck('data', 'plan'),
        tap((plan: Plan) => {
          this.stageQuestionsStore.updateRoot(({
            plan: plan,
            child: plan.child,
          }));
        }),
      );
  }

  private fetchAnswerOptions() {
    return this.answerOptionsGQL
      .fetch()
      .pipe(
        pluck('data', 'answerOptions', 'data'),
        tap((answerOptions: AnswerOption[]) => {
          this.stageQuestionsStore.updateRoot(({
            answerOptions: answerOptions,
          }));
        }),
      );
  }

  private fetchStageWithQuestions(stageId: string, planId: string) {
    return this.stagePageGQL
      .fetch({
        id: stageId,
        planId: planId,
      }, {
        fetchPolicy: 'network-only',
      })
      .pipe(
        pluck('data', 'stage'),
        tap((stage: Stage) => {
          this.stageQuestionsStore.updateRoot(({
            stage: stage,
          }));

          this.stageQuestionsStore.set(stage.questions.data);
        }),
      );
  }

  private fetchStageWithProgress(stageId: string, planId: string) {
    return this.stageWithProgressGQL
      .fetch({
        id: stageId,
        planId: planId,
      }, {
        fetchPolicy: 'network-only',
      })
      .pipe(
        pluck('data', 'stage'),
        tap((stage: Stage) => {
          this.stageQuestionsStore.updateRoot(state => ({
            ...state,
            stage: stage,
          }));
        }),
      );
  }

  fetchNextQuestion() {
    return this.stageQuestionsStore._select(s => s)
      .pipe(
        first(),
        switchMap((s) => {
          return this.nextQuestionGQL
            .fetch({
              stageId: s.stageId,
              planId: s.planId,
            }, {fetchPolicy: 'network-only'})
            .pipe(
              pluck('data', 'nextQuestion'),
              tap((question: Question) => {
                if (question) {
                  this.stageQuestionsStore.updateRoot(state => ({
                    ...state,
                    nextQuestion: question,
                  }));

                  this.stageQuestionsStore.createOrReplace(question.id, question);
                  this.stageQuestionsStore.setActive(question.id);
                }
              }),
            );
        }),
      );
  }

  changeQuestion(question: Question) {
    this.stageQuestionsStore.updateRoot(state => {
      return {
        ...state,
        nextQuestion: question,
      };
    });
  }

  setQuestionActive(question: Question) {
    this.stageQuestionsStore.setActive(question.id);
  }

  fetchQuestion(id: string) {
    return this.stageQuestionsStore
      ._select(s => s)
      .pipe(
        first(),
        switchMap((s) => {
          return this.questionGQL
            .fetch({
              id: id,
              childId: s.child.id,
              planId: s.planId,
            }, {fetchPolicy: 'network-only'})
            .pipe(
              pluck('data', 'question'),
              tap((question: Question) => {
                this.stageQuestionsStore.createOrReplace(question.id, question);
              }),
            );
        }),
      );
  }

  answer(question: Question, answerOption: AnswerOption) {
    this.stageQuestionsStore.setLoading(true);

    return this.stageQuestionsStore
      ._select(s => s)
      .pipe(
        first(),
        switchMap((s) => {
          return this.answerGQL
            .mutate({
              input: {
                planId: s.planId,
                questionId: question.id,
                answerOptionId: answerOption.id,
              },
            })
            .pipe(
              pluck('data', 'answer'),
              switchMap(() => {
                this.fetchStageWithProgress(s.stageId, s.planId).subscribe();

                return this.fetchNextQuestion()
                  .pipe(finalize(() => {
                    this.stageQuestionsStore.setLoading(false);
                    this.fetchQuestion(question.id).subscribe();
                  }));
              }),
            );
        }),
      );
  }

  stageCompleted(childId: string, planId: string, stageId: string) {
    this.childrenService.fetchAll({}, {forceFetch: true}).subscribe();
    this.plansService.fetchAllByChild({childId: childId}, {forceFetch: true}).subscribe();
    this.plansService.fetchOne({planId: planId}, {forceFetch: true}).subscribe((plan: Plan) => {
      this.stageQuestionsStore.updateRoot(({
        plan: plan,
      }));
    });
  }

}
