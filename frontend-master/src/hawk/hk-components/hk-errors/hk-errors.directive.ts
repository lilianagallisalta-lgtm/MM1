import {Directive, Input} from "@angular/core";
import {HkErrorsComponent} from "./hk-errors.component";

@Directive({
  selector: '[hk-errors]',
})
export class HkErrorsDirective extends HkErrorsComponent {
  @Input('hk-errors') apiKey: string;
  @Input() public group: string;
}
