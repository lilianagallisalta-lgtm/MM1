import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {HkItemComponent} from "./components/hk-item/hk-item.component";
import {HkLabelComponent} from "./components/hk-label/hk-label.component";
import {CommonModule} from "@angular/common";
import {HkListComponent} from "./components/hk-list/hk-list.component";
import {HkListHeaderComponent} from "./components/hk-list-header/hk-list-header.component";
import {HkListActionsComponent} from "./components/hk-list-actions/hk-list-actions.component";

const COMPONENTS = [
  HkListComponent,
  HkItemComponent,
  HkLabelComponent,
  HkListHeaderComponent,
  HkListActionsComponent,
];

@NgModule({
  declarations: [
    COMPONENTS,
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [
    COMPONENTS,
  ]
})
export class HkListModule {}
