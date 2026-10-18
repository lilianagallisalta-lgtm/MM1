import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HkErrorsComponent } from './components/hk-errors/hk-errors.component';
import { HkMutationDirective } from './components/hk-mutation/hk-mutation.directive';
import { HkListActionsComponent } from './components/hk-list-actions/hk-list-actions.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
  ],
  declarations: [
    HkErrorsComponent,
    HkMutationDirective,
    HkListActionsComponent,
  ],
  exports: [
    HkErrorsComponent,
    HkMutationDirective,
    HkListActionsComponent,
  ],
})
export class HkFormsModule { }
