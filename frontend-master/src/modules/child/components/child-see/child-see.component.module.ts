import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "ionic-angular";
import {ChildSeeComponent} from "./child-see.component";
import {SharedModule} from "../../../../shared/shared.module";

@NgModule({
  declarations: [
    ChildSeeComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
  ],
  exports: [
    ChildSeeComponent,
  ],
})
export class ChildSeeComponentModule {}
