import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { WalkthroughPage } from './walkthrough.page';
import {SharedModule} from '../../../shared/shared.module';
import {MatStepperModule} from '@angular/material';

const routes: Routes = [
  {
    path: '',
    component: WalkthroughPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatStepperModule,
  ],
  declarations: [WalkthroughPage]
})
export class WalkthroughPageModule {}
