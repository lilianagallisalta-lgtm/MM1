import {NgModule} from "@angular/core";
import {LoginComponent} from "./login.component";
import {SharedModule} from "../../../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {IonicModule} from "ionic-angular";

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginComponentModule {}
