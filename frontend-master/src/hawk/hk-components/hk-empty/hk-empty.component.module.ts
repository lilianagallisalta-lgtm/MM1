import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {HkEmptyComponent} from "./hk-empty.component";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    HkEmptyComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    HkEmptyComponent
  ]
})
export class HkEmptyComponentModule {}
