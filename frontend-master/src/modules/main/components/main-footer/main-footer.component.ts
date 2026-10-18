import {Component, OnInit, Input} from "@angular/core";
import {NavigationService} from "../../../../hawk/hk-providers/navigation.service";

@Component({
  selector: 'main-footer',
  templateUrl: 'main-footer.component.html'
})
export class MainFooterComponent implements OnInit {
  @Input() color: 'dark' | 'light' = 'dark';

  @Input() showLinks: boolean = true;

  constructor(
    private navigationService: NavigationService,
  ) {
  }

  ngOnInit() {
  }

  goTo(page: string, params?: any) {
    this.navigationService.push(page, params);
  }
}
