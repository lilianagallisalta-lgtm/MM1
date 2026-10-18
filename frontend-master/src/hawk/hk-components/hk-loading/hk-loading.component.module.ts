import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {HkLoadingComponent} from "./hk-loading.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    HkLoadingComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    HkLoadingComponent
  ]
})
export class HkLoadingComponentModule {}
