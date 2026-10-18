import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {ResultsPage} from "./results.page";
import {SharedModule} from "../../../../shared/shared.module";
import {NgxGaugeModule} from 'ngx-gauge';
import {ChildSeeComponentModule} from '../../../child/components/child-see/child-see.component.module';

@NgModule({
  declarations: [
    ResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultsPage),
    SharedModule,
    NgxGaugeModule,
    ChildSeeComponentModule,
  ],
  exports: [
    ResultsPage
  ],
  providers: [
  ],
})
export class ResultsPageModule {}
