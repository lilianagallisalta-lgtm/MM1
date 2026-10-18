import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {SignUpComponent} from "./sign-up.component";
import {SharedModule} from "../../../../shared/shared.module";
import {MatTabsModule} from "@angular/material";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    MatTabsModule,
  ],
  exports: [
    SignUpComponent
  ]
})
export class SignUpComponentModule {}
