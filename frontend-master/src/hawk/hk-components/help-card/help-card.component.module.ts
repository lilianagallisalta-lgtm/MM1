import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {HelpCardComponent} from "./help-card.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    HelpCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FlexLayoutModule,
  ],
  exports: [
    HelpCardComponent
  ]
})
export class HelpCardComponentModule {}
