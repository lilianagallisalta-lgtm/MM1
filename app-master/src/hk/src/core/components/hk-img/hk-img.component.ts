import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'hk-img',
  templateUrl: './hk-img.component.html',
  styleUrls: ['./hk-img.component.scss']
})
export class HkImgComponent implements OnInit {

  @Input() src: any;

  @Input('class') classList: string;
  @Input() baseClass: string = 'bg-contain bg-center bg-no-repeat';

  constructor() { }

  ngOnInit() {
  }

}
