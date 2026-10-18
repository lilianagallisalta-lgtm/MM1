import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {StagesPage} from "./stages.page";
import {SharedModule} from "../../../../shared/shared.module";

@NgModule({
  declarations: [
    StagesPage,
  ],
  imports: [
    IonicPageModule.forChild(StagesPage),
    SharedModule,
  ],
  exports: [
    StagesPage
  ],
  providers: [
  ],
})
export class StagesPageModule {}
