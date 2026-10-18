import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'hk-img-placeholder',
  templateUrl: './img-placeholder.component.html',
  styleUrls: ['./img-placeholder.component.scss']
})
export class ImgPlaceholderComponent implements OnInit {

  @Input('class') listClass: string = 'p-4';

  constructor() { }

  ngOnInit() {
  }

}
