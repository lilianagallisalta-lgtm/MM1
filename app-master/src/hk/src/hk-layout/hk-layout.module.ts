import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HkContainerComponent} from './components/hk-container/hk-container.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    HkContainerComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
  ],
  exports: [
    HkContainerComponent,
  ],
})
export class HkLayoutModule { }
