import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {HkErrorsComponent} from "./hk-errors.component";
import {HkErrorsDirective} from "./hk-errors.directive";
import {HkErrorsGroupDirective} from "./hk-errors-group.directive";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    HkErrorsComponent,
    HkErrorsDirective,
    HkErrorsGroupDirective,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    HkErrorsComponent,
    HkErrorsDirective,
    HkErrorsGroupDirective,
  ]
})
export class HkErrorsComponentModule {}
