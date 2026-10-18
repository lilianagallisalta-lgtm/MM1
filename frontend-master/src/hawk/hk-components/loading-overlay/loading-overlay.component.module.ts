import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {CommonModule} from "@angular/common";
import {LoadingOverlayComponent} from './loading-overlay.component';
import {MatProgressBarModule} from '@angular/material';

@NgModule({
  declarations: [
    LoadingOverlayComponent,
  ],
  imports: [
    CommonModule,
    MatProgressBarModule,
  ],
  exports: [
    LoadingOverlayComponent,
  ]
})
export class LoadingOverlayComponentModule {}
