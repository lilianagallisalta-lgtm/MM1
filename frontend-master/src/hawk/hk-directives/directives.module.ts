import { NgModule } from '@angular/core';
import {ClickStopPropagationDirective} from "./click-stop-propagation.directive";
import {HkDebounceDirective} from "./hk-debounce";
import {HkBottomThreshold} from "./hk-bottom-threshold";
import {HkBottomThresholdMargin} from "./hk-bottom-threshold-margin";
import {HkKeysPipe} from "./hk-keys.directive";
import {HkSelectAllDirective} from "./hk-select-all.directive";

const DIRECTIVES = [
  ClickStopPropagationDirective,
  HkDebounceDirective,
  HkBottomThreshold,
  HkBottomThresholdMargin,
  HkKeysPipe,
  HkSelectAllDirective,
];

@NgModule({
  declarations: DIRECTIVES,
  imports: [],
  exports: DIRECTIVES,
})
export class DirectivesModule {}
