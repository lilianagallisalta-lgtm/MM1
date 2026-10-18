import {
  Directive, ElementRef, Input, OnInit,
  Renderer2
} from "@angular/core";
import {Content} from "ionic-angular";

@Directive({
  selector: '[hk-header-clear]',
})
export class HkClearHeaderDirective implements OnInit {
  @Input() content: Content;

  @Input() offsetTop: number = 100;

  clearClass: string = 'hk-header-clear';
  normalClass: string = 'hk-header-normal';
  state: string = 'clear';

  constructor(
    public element: ElementRef,
    public render: Renderer2,
  ){
  }

  ngOnInit() {
    this._log('init', this.element, this.content);

    this.assignClass('clear');

    this.content
      .ionScroll
      .subscribe(() => {
        this._log('content offset top', this.content.scrollTop);

        let state: string;

        if (this.content.scrollTop >= this.offsetTop) {
          state = 'normal';
        } else {
          state = 'clear';
        }

        this.assignClass(state);
      });
  }

  assignClass(state: string) {
    this._log('assign class', state);

    if (state == this.state) {
      return;
    }

    this.state = state;

    switch (state) {
      case 'clear':
        this.render.removeClass(this.element.nativeElement, this.normalClass);
        this.render.addClass(this.element.nativeElement, this.clearClass);
        break;

      case 'normal':
        this.render.removeClass(this.element.nativeElement, this.clearClass);
        this.render.addClass(this.element.nativeElement, this.normalClass);
        break;
    }
  }

  private _log(...args) {
      // console.debug('[hk-header-clear]', ...args);
  }
}
