import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HkDatepickerComponent} from "./components/hk-datepicker/hk-datepicker.component";
import {SharedModule} from "../../shared/shared.module";
import {IonicPageModule} from "ionic-angular";
import {MdePopoverModule} from "@material-extended/mde";

@NgModule({
  declarations: [
    HkDatepickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicPageModule,
    MdePopoverModule,
  ],
  exports: [
    HkDatepickerComponent,
    CommonModule,
    FormsModule,
  ],
})
export class HkDatepickerModule { }
