import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {ExaminedProgressComponent} from "./examined-progress.component";
import {SharedModule} from "../../../../shared/shared.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    ExaminedProgressComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
  ],
  exports: [
    ExaminedProgressComponent
  ]
})
export class ExaminedProgressComponentModule {}
