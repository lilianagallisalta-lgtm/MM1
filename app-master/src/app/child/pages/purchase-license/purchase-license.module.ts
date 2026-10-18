import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PurchaseLicensePage } from './purchase-license.page';
import {SharedModule} from '../../../shared/shared.module';
import {CheckoutModule} from '../../../checkout/checkout.module';

const routes: Routes = [
  {
    path: '',
    component: PurchaseLicensePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    CheckoutModule,
  ],
  declarations: [PurchaseLicensePage]
})
export class PurchaseLicensePageModule {}
