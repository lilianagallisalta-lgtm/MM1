import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TosPage } from './tos.page';
import {SharedModule} from '../../../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: TosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [TosPage]
})
export class TosPageModule {}
