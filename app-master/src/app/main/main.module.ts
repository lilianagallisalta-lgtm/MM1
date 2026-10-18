import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainFooterComponent } from './components/main-footer/main-footer.component';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
  ],
  declarations: [
    MainFooterComponent,
  ],
  exports: [
    MainFooterComponent,
  ],
})
export class MainModule { }
