import {Injectable} from "@angular/core";
import {Query} from "@datorama/akita";
import {StageQuestionsModel, StageQuestionsStore} from "./stageQuestions.store";

@Injectable({
  providedIn: 'root',
})
export class StageQuestionsQuery extends Query<StageQuestionsModel> {
  stage$ = this.store._select(s => s.stage);
  child$ = this.store._select(s => s.child);
  nextQuestion$ = this.store._select(s => s.nextQuestion);
  answerOptions$ = this.store._select(s => s.answerOptions);
  loading$ = this.store._select(s => s.loading);

  constructor(store: StageQuestionsStore) {
    super(store);
  }
}
