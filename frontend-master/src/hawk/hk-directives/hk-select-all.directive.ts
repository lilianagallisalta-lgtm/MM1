// https://forum.ionicframework.com/t/ion-input-select-all-text-on-focus/79406/4
import {ElementRef, Directive, HostListener} from "@angular/core";

@Directive({
  selector: 'ion-input[hk-select-all]'
})
export class HkSelectAllDirective {
  constructor(
    private element: ElementRef,
  ) {
    console.debug('el', this.element);
  }

  @HostListener('click')
  selectAll() {
    // access to the native input element
    let nativeEl: HTMLInputElement = this.element.nativeElement.querySelector('input');

    if (nativeEl) {
      if (nativeEl.setSelectionRange) {
        // select the text from start to end
        return nativeEl.setSelectionRange(0, nativeEl.value.length);
      }

      nativeEl.select();
    }
  }
}
