import {Component, OnInit, Input} from "@angular/core";

@Component({
  selector: 'hk-loading',
  templateUrl: 'hk-loading.component.html'
})
export class HkLoadingComponent implements OnInit {
  @Input() layoutFill: boolean = true;

  constructor(
  ) {
  }

  ngOnInit() {

  }
}
