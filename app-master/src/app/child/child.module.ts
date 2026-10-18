import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChildrenListComponent} from './components/children-list/children-list.component';
import {IonicModule} from '@ionic/angular';
import {SharedModule} from '../shared/shared.module';
import {ChildUpsertComponent} from './components/child-upsert/child-upsert.component';
import {RouterModule} from '@angular/router';
import { ChildCardComponent } from './components/child-card/child-card.component';
import { ChildPlansComponent } from './components/child-plans/child-plans.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    RouterModule,
  ],
  declarations: [
    ChildrenListComponent,
    ChildUpsertComponent,
    ChildCardComponent,
    ChildPlansComponent,
  ],
  exports: [
    ChildrenListComponent,
    ChildUpsertComponent,
    ChildCardComponent,
    ChildPlansComponent,
  ],
})
export class ChildModule {
}
