import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HkDatepickerComponent} from './components/hk-datepicker/hk-datepicker.component';
import {MdePopoverModule} from '@material-extended/mde';
import {IonicModule} from '@ionic/angular';
import {HkDaterangepickerComponent} from './components/hk-daterangepicker/hk-daterangepicker.component';
import {HkRangeCalendarComponent} from './components/hk-range-calendar/hk-range-calendar.component';
import {HkCalendarComponent} from './components/hk-calendar/hk-calendar.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatRippleModule} from '@angular/material';

@NgModule({
  declarations: [
    HkDatepickerComponent,
    HkDaterangepickerComponent,
    HkRangeCalendarComponent,
    HkCalendarComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatRippleModule,
    MdePopoverModule,
  ],
  exports: [
    HkDatepickerComponent,
    HkDaterangepickerComponent,
  ],
})
export class HkDatepickerModule { }
