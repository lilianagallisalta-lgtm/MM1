import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {MeMenuComponent} from "./me-menu.component";
import {SharedModule} from "../../../../shared/shared.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    MeMenuComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
  ],
  exports: [
    MeMenuComponent
  ]
})
export class MeMenuComponentModule {}
