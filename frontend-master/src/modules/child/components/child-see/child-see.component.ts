import {Component, Input, OnInit} from "@angular/core";
import {Child} from '../../../../graphql/graphql';

@Component({
  selector: 'child-see',
  templateUrl: 'child-see.component.html',
})
export class ChildSeeComponent implements OnInit {

  @Input() child: Child;

  constructor(
  ) {
  }

  ngOnInit() {
  }
}
