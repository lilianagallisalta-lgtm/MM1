import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NotFoundPage } from './not-found.page';
import {SharedModule} from '../../../shared/shared.module';
import {MainModule} from '../../main.module';

const routes: Routes = [
  {
    path: '',
    component: NotFoundPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    MainModule,
  ],
  declarations: [NotFoundPage]
})
export class NotFoundPageModule {}
