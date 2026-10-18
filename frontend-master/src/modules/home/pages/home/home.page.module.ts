import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {HomePage} from "./home.page";
import {SharedModule} from "../../../../shared/shared.module";
import {HkClearHeaderModule} from "../../../../hawk/hk-header-clear/hk-header-clear.module";
import {MainFooterComponentModule} from "../../../main/components/main-footer/main-footer.component.module";

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    SharedModule,
    HkClearHeaderModule,
    MainFooterComponentModule,
  ],
  exports: [
    HomePage
  ],
  providers: [
  ]
})
export class HomePageModule {}
