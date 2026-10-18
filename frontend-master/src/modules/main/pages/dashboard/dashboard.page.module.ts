import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {DashboardPage} from "./dashboard.page";
import {SharedModule} from "../../../../shared/shared.module";
import {MeComponentModule} from "../../../auth/components/me/me.component.module";
import {ChildrenListComponentModule} from "../../../child/components/children-list/children-list.component.module";

@NgModule({
  declarations: [
    DashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardPage),
    SharedModule,
    MeComponentModule,
    ChildrenListComponentModule,
  ],
  exports: [
    DashboardPage
  ],
  providers: [
  ]
})
export class DashboardPageModule {}
