import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {LoginPage} from "./login.page";
import {SharedModule} from "../../../../shared/shared.module";
import {LoginComponentModule} from "../../components/login/login.component.module";

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
    SharedModule,
    LoginComponentModule,
  ],
  exports: [
    LoginPage
  ],
  providers: [
  ]
})
export class LoginPageModule {}
