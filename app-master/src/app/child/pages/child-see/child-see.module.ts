import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChildSeePage } from './child-see.page';
import {SharedModule} from '../../../shared/shared.module';
import {ChildModule} from '../../child.module';

const routes: Routes = [
  {
    path: '',
    component: ChildSeePage
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
  ],
  declarations: [ChildSeePage]
})
export class ChildSeePageModule {}
