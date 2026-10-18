import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {StagePage} from "./stage.page";
import {SharedModule} from "../../../../shared/shared.module";
import {ExaminedProgressComponentModule} from "../../../exam/components/examined-progress/examined-progress.component.module";
import {MatProgressBarModule} from "@angular/material";

@NgModule({
  declarations: [
    StagePage,
  ],
  imports: [
    IonicPageModule.forChild(StagePage),
    SharedModule,
    ExaminedProgressComponentModule,
    MatProgressBarModule,
  ],
  exports: [
    StagePage
  ],
  providers: [
  ],
})
export class StagePageModule {}
