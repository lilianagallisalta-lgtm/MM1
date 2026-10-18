import {NgModule} from "@angular/core";
import {IonicModule} from "ionic-angular";
import {HkLoadingComponentModule} from "../hawk/hk-components/hk-loading/hk-loading.component.module";
import {PipesModule} from "../hawk/hk-pipes/pipes.module";
import {DirectivesModule} from "../hawk/hk-directives/directives.module";
import {HkEmptyComponentModule} from "../hawk/hk-components/hk-empty/hk-empty.component.module";
import {HkErrorsComponentModule} from "../hawk/hk-components/hk-errors/hk-errors.component.module";
import {HelpCardComponentModule} from "../hawk/hk-components/help-card/help-card.component.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {HkRippleModule} from "../hawk/hk-ripple/hk-ripple.module";
import {
  MatPaginatorModule, MatProgressBarModule, MatRippleModule, MatTableModule,
  MatTooltipModule
} from "@angular/material";
import {MomentModule} from "ngx-moment";
import {HkListModule} from "../hawk/hk-list/hk-list.module";
import {TranslateModule} from "@ngx-translate/core";
import {CdkTableModule} from "@angular/cdk/table";
import {SafePipeModule} from "safe-pipe";
import {ReactiveFormsModule} from "@angular/forms";
import {LoadingOverlayComponentModule} from '../hawk/hk-components/loading-overlay/loading-overlay.component.module';

@NgModule({
  declarations: [
  ],
  imports: [
    IonicModule,
    FlexLayoutModule,
  ],
  exports: [
    DirectivesModule,
    PipesModule,

    // flex-layout
    FlexLayoutModule,

    // hawk
    HkLoadingComponentModule,
    HkEmptyComponentModule,
    HkErrorsComponentModule,
    HelpCardComponentModule,
    HkRippleModule,
    LoadingOverlayComponentModule,

    // angular-material
    MatTooltipModule,

    // ngx-moment
    MomentModule,

    // hk-list
    HkListModule,

    // ngx-translate
    TranslateModule,

    // angular-material
    CdkTableModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatRippleModule,

    // safe pipes
    SafePipeModule,

    ReactiveFormsModule,
  ],
  providers: [],
})
export class SharedModule {}
