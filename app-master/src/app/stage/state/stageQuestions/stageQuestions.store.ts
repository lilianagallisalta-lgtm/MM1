import {Injectable} from '@angular/core';
import {EntityState, StoreConfig} from '@datorama/akita';
import {AnswerOption, Child, Plan, Question, Stage} from '../../../../graphql/generated/graphql';
import {HawkqlStore} from '../../../../hawkql/api/hawkql-store';

export interface StageQuestionsState extends EntityState<Question> {
  stageId: string;
  childId: string;
  stage: Stage;
  child: Child;
  plan: Plan;
  answerOptions: AnswerOption[];
  nextQuestion: Question;
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'stageQuestions' })
export class StageQuestionsStore extends HawkqlStore<StageQuestionsState, Question> {

  constructor(
  ) {
    super({});
  }

}
