// Por @jlcarv [https://forum.ionicframework.com/t/ionic-ripple-effect-manually/52519/19?u=enzonotario]

import {Directive, ElementRef, Host, Renderer2} from '@angular/core';

@Directive({
  selector: '[ripple]',
  host: {
    'tappable': '',
    'role': 'button',
    'style': 'position: relative; overflow: hidden'
  }
})
export class HkRippleDirective {
  constructor(
    @Host() host: ElementRef,
    renderer: Renderer2,
  ) {
    const div = renderer.createElement('div');
    renderer.addClass(div, 'button-effect');
    renderer.setStyle(div, "display", "block");
    renderer.appendChild(host.nativeElement, div);
  }
}
