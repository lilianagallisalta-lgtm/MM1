import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {ChildEditPage} from "./child-edit.page";
import {SharedModule} from "../../../../shared/shared.module";
import {ChildUpsertComponentModule} from "../../components/child-upsert/child-upsert.component.module";

@NgModule({
  declarations: [
    ChildEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ChildEditPage),
    SharedModule,
    ChildUpsertComponentModule,
  ],
  exports: [
    ChildEditPage
  ],
  providers: [
  ],
})
export class ChildEditPageModule {}
