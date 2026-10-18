import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ChildHistoryPage } from './child-history.page';
import {SharedModule} from '../../../shared/shared.module';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {ChildModule} from '../../child.module';

const routes: Routes = [
  {
    path: '',
    component: ChildHistoryPage
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
    NgxChartsModule,
  ],
  declarations: [ChildHistoryPage]
})
export class ChildHistoryPageModule {}
