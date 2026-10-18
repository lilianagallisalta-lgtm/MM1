import {Component, Input, OnInit} from '@angular/core';
import {Area, Result} from '../../../../graphql/generated/graphql';

@Component({
  selector: 'app-result-gauge',
  templateUrl: './result-gauge.component.html',
  styleUrls: ['./result-gauge.component.scss']
})
export class ResultGaugeComponent implements OnInit {

  @Input() area: Area;
  @Input() result: Result;

  constructor() { }

  ngOnInit() {
  }

}
