import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoStageComponent } from './components/do-stage/do-stage.component';
import {IonicModule} from '@ionic/angular';
import {SharedModule} from '../shared/shared.module';
import { StageResultsComponent } from './components/stage-results/stage-results.component';
import {NgxGaugeModule} from 'ngx-gauge';
import {ResultModule} from '../result/result.module';
import { StageProgressComponent } from './components/stage-progress/stage-progress.component';
import { StageQuestionsSelectorComponent } from './components/stage-questions-selector/stage-questions-selector.component';
import { StageWalkthroughComponent } from './components/stage-walkthrough/stage-walkthrough.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    NgxGaugeModule,
    ResultModule,
  ],
  declarations: [
    DoStageComponent,
    StageResultsComponent,
    StageProgressComponent,
    StageQuestionsSelectorComponent,
    StageWalkthroughComponent,
  ],
  exports: [
    DoStageComponent,
    StageResultsComponent,
    StageWalkthroughComponent,
  ],
})
export class StageModule { }
