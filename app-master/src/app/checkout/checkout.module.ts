import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutMercadopagoComponent } from './components/checkout-mercadopago/checkout-mercadopago.component';
import {IonicModule} from '@ionic/angular';
import {SharedModule} from '../shared/shared.module';
import {MatFormFieldModule, MatOptionModule, MatSelectModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
  ],
  declarations: [
    CheckoutMercadopagoComponent,
  ],
  exports: [
    CheckoutMercadopagoComponent,
  ],
})
export class CheckoutModule { }
