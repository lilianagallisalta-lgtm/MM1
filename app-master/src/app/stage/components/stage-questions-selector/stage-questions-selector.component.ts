import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {StageQuestionsQuery} from '../../state/stageQuestions/stageQuestions.query';
import {Question} from '../../../../graphql/generated/graphql';
import {StageQuestionsService} from '../../state/stageQuestions/stageQuestions.service';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-stage-questions-selector',
  templateUrl: './stage-questions-selector.component.html',
  styleUrls: ['./stage-questions-selector.component.scss']
})
export class StageQuestionsSelectorComponent implements OnInit, OnDestroy {

  @ViewChild('scrollContent') scrollContent: ElementRef;

  questions$ = this.stageQuestionsQuery.selectAll();
  questionActive$ = this.stageQuestionsQuery.selectActive();
  nextQuestion$ = this.stageQuestionsQuery.nextQuestion$;

  /**
   * Pregunta seleccionada manualmente por el usuario.
   */
  questionSelected: Question;

  constructor(
    private stageQuestionsQuery: StageQuestionsQuery,
    private stageQuestionsService: StageQuestionsService,
  ) { }

  ngOnInit() {
    this.questionActive$
      .pipe(untilDestroyed(this))
      .subscribe((question: Question) => {
        if (! question) {
          return;
        }

        if (this.questionSelected && this.questionSelected.id === question.id) {
          return;
        }

        const questionActiveButton = document.getElementById('button-question-' + question.id);

        if (! questionActiveButton) {
          return;
        }

        this.scrollContent.nativeElement.scrollLeft = questionActiveButton.offsetLeft - 200;
      });
  }

  ngOnDestroy() { }

  select(question: Question) {
    this.nextQuestion$
      .pipe(first())
      .subscribe(nextQuestion => {
        if (nextQuestion.id < question.id) {
          // No puede seleccionar una pregunta más allá de la activa.
          return;
        }

        this.questionSelected = question;
        this.stageQuestionsService.setQuestionActive(question);
      });
  }

}
