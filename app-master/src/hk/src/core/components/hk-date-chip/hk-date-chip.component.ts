import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'hk-date-chip',
  templateUrl: './hk-date-chip.component.html',
  styleUrls: ['./hk-date-chip.component.scss']
})
export class HkDateChipComponent implements OnInit {

  @Input() datetime: string;

  @Input() color: string = 'grey';

  /**
   * Indica si debe mostrarse el `time ago` como label y la fecha entera como tooltip.
   */
  @Input() ago: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
