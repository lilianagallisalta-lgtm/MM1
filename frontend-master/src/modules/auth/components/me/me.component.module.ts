import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {MeComponent} from "./me.component";
import {SharedModule} from "../../../../shared/shared.module";
import {MdePopoverModule} from "@material-extended/mde";
import {MeMenuComponentModule} from "../me-menu/me-menu.component.module";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    MeComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    MdePopoverModule,
    MeMenuComponentModule,
  ],
  exports: [
    MeComponent
  ]
})
export class MeComponentModule {}
