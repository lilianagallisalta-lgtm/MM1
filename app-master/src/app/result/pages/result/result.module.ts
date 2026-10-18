import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResultPage } from './result.page';
import {SharedModule} from '../../../shared/shared.module';
import {ChildModule} from '../../../child/child.module';
import {ResultModule} from '../../result.module';

const routes: Routes = [
  {
    path: '',
    component: ResultPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    ChildModule,
    ResultModule,
  ],
  declarations: [ResultPage]
})
export class ResultPageModule {}
