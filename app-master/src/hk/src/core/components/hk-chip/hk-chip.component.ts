import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: ' hk-chip',
  templateUrl: './hk-chip.component.html',
  styleUrls: ['./hk-chip.component.scss']
})
export class HkChipComponent implements OnInit {

  @Input()
  set color(value: string|string[]|Set<string>|{[klass: string]: any}) {
    if (typeof  value === 'string') {
      this._color = value;
    } else {
      for (const key of Object.keys(value)) {
        if (value[key] === true) {
          this._color = key;
          return;
        }
      }
    }
  }
  _color: string;

  @Input() withBorder: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
