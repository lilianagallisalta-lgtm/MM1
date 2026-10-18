import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {ChildCreatePage} from "./child-create.page";
import {SharedModule} from "../../../../shared/shared.module";
import {ChildUpsertComponentModule} from "../../components/child-upsert/child-upsert.component.module";

@NgModule({
  declarations: [
    ChildCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ChildCreatePage),
    SharedModule,
    ChildUpsertComponentModule,
  ],
  exports: [
    ChildCreatePage
  ],
  providers: [
  ],
})
export class ChildCreatePageModule {}
