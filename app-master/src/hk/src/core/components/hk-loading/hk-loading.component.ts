import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'hk-loading',
  templateUrl: './hk-loading.component.html',
  styleUrls: ['./hk-loading.component.scss']
})
export class HkLoadingComponent implements OnInit {

  @Input() label: string = null;

  constructor() { }

  ngOnInit() {
  }

}
