import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultGamesComponent } from './components/result-games/result-games.component';
import {IonicModule} from '@ionic/angular';
import {SharedModule} from '../shared/shared.module';
import { ResultGaugeComponent } from './components/result-gauge/result-gauge.component';
import {NgxGaugeModule} from 'ngx-gauge';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    NgxGaugeModule,
  ],
  declarations: [
    ResultGamesComponent,
    ResultGaugeComponent,
  ],
  exports: [
    ResultGamesComponent,
    ResultGaugeComponent,
  ],
})
export class ResultModule { }
