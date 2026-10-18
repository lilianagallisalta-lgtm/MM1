import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatProgressBarModule, MatProgressSpinnerModule, MatRippleModule, MatSelectModule} from '@angular/material';
import {CommonModule} from '@angular/common';
import {MainModule} from '../main/main.module';
import {DateFnsModule} from 'ngx-date-fns';
import {HkHelpCardComponent} from './components/hk-help-card/hk-help-card.component';
import {SafePipeModule} from 'safe-pipe';
import { ImgPlaceholderComponent } from './components/img-placeholder/img-placeholder.component';
import {IonicModule} from '@ionic/angular';
import { CookieConscentComponent } from './components/cookie-conscent/cookie-conscent.component';
import { HkEmptyComponent } from './components/hk-empty/hk-empty.component';
import {HkFormsModule} from '../hk-forms/hk-forms.module';
import {HkModule} from '../../hk/src/core/hk.module';
import {HkLayoutModule} from '../../hk/src/hk-layout/hk-layout.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
  ],
  declarations: [
    HkHelpCardComponent,
    ImgPlaceholderComponent,
    CookieConscentComponent,
    HkEmptyComponent,
  ],
  exports: [
    // reactive forms
    ReactiveFormsModule,

    // @angular/flex-layout
    FlexLayoutModule,

    // @angular/material modules
    MatRippleModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,

    // joanllenas/ngx-date-fns
    DateFnsModule,

    // safe-pipes
    SafePipeModule,

    // hawk
    HkHelpCardComponent,
    ImgPlaceholderComponent,
    CookieConscentComponent,
    HkEmptyComponent,
    HkFormsModule,
    HkModule,
    HkLayoutModule,

    MainModule,
  ],
})
export class SharedModule {
}
