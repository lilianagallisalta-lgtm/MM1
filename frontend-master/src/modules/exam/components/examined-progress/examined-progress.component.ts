import {Component, OnInit, Input} from "@angular/core";

@Component({
  selector: 'examined-progress',
  templateUrl: 'examined-progress.component.html'
})
export class ExaminedProgressComponent implements OnInit {
  @Input() progress: number;

  constructor(
  ) {
  }

  ngOnInit() {
  }
}
