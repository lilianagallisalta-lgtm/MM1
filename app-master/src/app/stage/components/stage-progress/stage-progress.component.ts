import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-stage-progress',
  templateUrl: './stage-progress.component.html',
  styleUrls: ['./stage-progress.component.scss']
})
export class StageProgressComponent implements OnInit {

  @Input() progress: number;

  constructor() { }

  ngOnInit() {
  }

}
