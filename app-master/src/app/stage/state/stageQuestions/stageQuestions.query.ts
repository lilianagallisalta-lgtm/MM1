import {Injectable} from '@angular/core';
import {QueryEntity} from '@datorama/akita';
import {StageQuestionsState, StageQuestionsStore} from './stageQuestions.store';
import {Question} from '../../../../graphql/generated/graphql';

@Injectable({
  providedIn: 'root',
})
export class StageQuestionsQuery extends QueryEntity<StageQuestionsState, Question> {

  stage$ = this.store._select(s => s.stage);
  child$ = this.store._select(s => s.child);
  plan$ = this.store._select(s => s.plan);
  answerOptions$ = this.store._select(s => s.answerOptions);
  loading$ = this.store._select(s => s.loading);

  questions$ = this.selectAll();
  nextQuestion$ = this.store._select(s => s.nextQuestion);

  constructor(store: StageQuestionsStore) {
    super(store);
  }

}
