import { Component, OnInit } from '@angular/core';
import {TosGQL} from '../../../../graphql/generated/graphql';
import {Observable} from 'rxjs';
import {pluck} from 'rxjs/operators';

@Component({
  selector: 'app-tos',
  templateUrl: './tos.page.html',
  styleUrls: ['./tos.page.scss'],
})
export class TosPage implements OnInit {

  tos$: Observable<string>;

  constructor(
    private tosGQL: TosGQL,
  ) { }

  ngOnInit() {
    this.tos$ = this.tosGQL
      .fetch()
      .pipe(
        pluck('data', 'tos'),
      );
  }

}
