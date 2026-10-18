import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChildCreatePage } from './child-create.page';
import {SharedModule} from '../../../shared/shared.module';
import {ChildModule} from '../../child.module';

const routes: Routes = [
  {
    path: '',
    component: ChildCreatePage
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
  declarations: [ChildCreatePage]
})
export class ChildCreatePageModule {}
