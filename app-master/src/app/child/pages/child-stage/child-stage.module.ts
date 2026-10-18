import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ChildStagePage } from './child-stage.page';
import {StageModule} from '../../../stage/stage.module';
import {SharedModule} from '../../../shared/shared.module';
import {ChildModule} from '../../child.module';

const routes: Routes = [
  {
    path: '',
    component: ChildStagePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    StageModule,
    ChildModule,
  ],
  declarations: [ChildStagePage]
})
export class ChildStagePageModule {}
