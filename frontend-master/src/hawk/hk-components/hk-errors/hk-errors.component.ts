import {
  Component, ContentChildren,
  OnInit, QueryList
} from "@angular/core";

@Component({
  selector: 'hk-errors',
  templateUrl: 'hk-errors.component.html'
})
export class HkErrorsComponent implements OnInit {

  @ContentChildren(HkErrorsComponent) children: QueryList<HkErrorsComponent>;

  constructor() { }

  ngOnInit() { }
}
