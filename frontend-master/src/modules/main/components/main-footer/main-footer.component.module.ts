import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {MainFooterComponent} from "./main-footer.component";
import {SharedModule} from "../../../../shared/shared.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    MainFooterComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
  ],
  exports: [
    MainFooterComponent
  ]
})
export class MainFooterComponentModule {}
