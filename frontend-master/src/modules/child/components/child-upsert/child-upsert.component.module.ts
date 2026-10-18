import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "ionic-angular";
import {ChildUpsertComponent} from "./child-upsert.component";
import {SharedModule} from "../../../../shared/shared.module";

@NgModule({
  declarations: [
    ChildUpsertComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
  ],
  exports: [
    ChildUpsertComponent,
  ],
})
export class ChildUpsertComponentModule {}
