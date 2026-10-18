import {NgModule} from "@angular/core";
import {IonicPageModule} from "ionic-angular";
import {SignupPage} from "./signup.page";
import {SharedModule} from "../../../../shared/shared.module";
import {SignUpComponentModule} from "../../components/sign-up/sign-up.component.module";

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
    SharedModule,
    SignUpComponentModule,
  ],
  exports: [
    SignupPage
  ],
  providers: [
  ]
})
export class SignupPageModule {}
