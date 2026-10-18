import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'hk-container',
  templateUrl: './hk-container.component.html',
  styleUrls: ['./hk-container.component.scss']
})
export class HkContainerComponent implements OnInit {

  @Input() direction: string = 'column';
  @Input() align: string = 'start stretch';
  @Input() gap: string = '1rem';
  @Input('divClass') classList: string;

  constructor() { }

  ngOnInit() { }

}
