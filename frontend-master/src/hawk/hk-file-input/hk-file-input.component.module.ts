import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {HkFileInputComponent} from "./hk-file-input.component";
import {ngfModule} from "angular-file";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    HkFileInputComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ngfModule,
    SharedModule,
  ],
  exports: [
    HkFileInputComponent
  ]
})
export class HkFileInputComponentModule {}
