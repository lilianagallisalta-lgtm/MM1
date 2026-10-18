import {
  ComponentFactoryResolver,
  Directive,
  Input,
  ViewContainerRef
} from '@angular/core';
import {HkLoadingOverlayComponent} from '../components/hk-loading-overlay/hk-loading-overlay.component';

@Directive({
  selector: '[ngIfWithLoading]',
})
export class WithLoadingDirective {

  @Input() set ngIf(val: any) {
    if (! val) {
      const factory = this.resolver.resolveComponentFactory(HkLoadingOverlayComponent);
      this.vcRef.createComponent(factory);
    }
  }

  constructor(
    private vcRef: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
  ) { }

}
