import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import {Observable} from 'rxjs';
import {Result, ResultGQL} from '../../../../graphql/graphql';
import {pluck} from 'rxjs/operators';
import {StageQuestionsStore} from '../../state/stageQuestions.store';
import {StageQuestionsQuery} from '../../state/stageQuestions.query';

@IonicPage({
  segment: 'children/:childId/stages/:stageId/results',
  defaultHistory: ['DashboardPage']
})
@Component({
  selector: 'page-results',
  templateUrl: 'results.page.html',
})
export class ResultsPage {

  stage$ = this.stageQuestionsQuery.stage$;
  child$ = this.stageQuestionsQuery.child$;
  loading$ = this.stageQuestionsQuery.loading$;
  result$: Observable<Result>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private resultGQL: ResultGQL,
    private stageQuestionsStore: StageQuestionsStore,
    private stageQuestionsQuery: StageQuestionsQuery,
  ) {
    this.stageQuestionsStore.init(this.navParams.get('stageId'), this.navParams.get('childId'));

    this.result$ = this.resultGQL
      .fetch({
        childId: this.navParams.get('childId'),
        stageId: this.navParams.get('stageId'),
      })
      .pipe(pluck('data', 'result'));
  }

  ionViewDidLoad() {
  }

}
