import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {ChildPage} from "./child.page";
import {SharedModule} from "../../../../shared/shared.module";
import {MatTableModule} from "@angular/material";
import {ExaminedProgressComponentModule} from '../../../exam/components/examined-progress/examined-progress.component.module';
import {ChildSeeComponentModule} from '../../components/child-see/child-see.component.module';

@NgModule({
  declarations: [
    ChildPage,
  ],
  imports: [
    IonicPageModule.forChild(ChildPage),
    SharedModule,
    MatTableModule,
    ExaminedProgressComponentModule,
    ChildSeeComponentModule,
  ],
  exports: [
    ChildPage
  ],
  providers: [
  ],
})
export class ChildPageModule {}
