import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HkLoadingOverlayComponent} from './components/hk-loading-overlay/hk-loading-overlay.component';
import {HkLoadingComponent} from './components/hk-loading/hk-loading.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatProgressBarModule, MatProgressSpinnerModule, MatTooltipModule} from '@angular/material';
import {ClickStopPropagationDirective} from './directives/click-stop-propagation.directive';
import {WithLoadingDirective} from './directives/with-loading.directive';
import {HkLetDirective} from './directives/hk-let.directive';
import {HkDateChipComponent} from './components/hk-date-chip/hk-date-chip.component';
import {HkChipComponent} from './components/hk-chip/hk-chip.component';
import {DateFnsModule} from 'ngx-date-fns';
import {HkImgComponent} from './components/hk-img/hk-img.component';
import {SafePipeModule} from 'safe-pipe';

@NgModule({
  declarations: [
    HkLoadingOverlayComponent,
    HkLoadingComponent,
    ClickStopPropagationDirective,
    WithLoadingDirective,
    HkLetDirective,
    HkDateChipComponent,
    HkChipComponent,
    HkImgComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    DateFnsModule,
    SafePipeModule,
  ],
  exports: [
    HkLoadingOverlayComponent,
    HkLoadingComponent,
    ClickStopPropagationDirective,
    WithLoadingDirective,
    HkLetDirective,
    HkDateChipComponent,
    HkChipComponent,
    HkImgComponent,
  ],
})
export class HkModule { }
