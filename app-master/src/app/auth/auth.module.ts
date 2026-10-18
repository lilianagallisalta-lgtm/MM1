import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './components/signin/signin.component';
import {SharedModule} from '../shared/shared.module';
import {IonicModule} from '@ionic/angular';
import {MatDividerModule} from '@angular/material';
import { SignupComponent } from './components/signup/signup.component';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    SharedModule,
    MatDividerModule,
  ],
  declarations: [
    SigninComponent,
    SignupComponent,
  ],
  exports: [
    SigninComponent,
    SignupComponent,
  ],
})
export class AuthModule { }
