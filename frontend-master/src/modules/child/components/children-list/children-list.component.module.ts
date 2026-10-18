import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {IonicModule} from "ionic-angular";
import {ChildrenListComponent} from "./children-list.component";
import {SharedModule} from "../../../../shared/shared.module";

@NgModule({
  declarations: [
    ChildrenListComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
  ],
  exports: [
    ChildrenListComponent,
  ],
})
export class ChildrenListComponentModule {}
