import {Input, ElementRef, Directive, Renderer2, OnInit} from "@angular/core";

@Directive({
  selector: '[hkBottomThreshold]'
})
export class HkBottomThreshold implements OnInit {
  @Input() hkBottomThreshold: number = 36;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'padding-bottom', this.hkBottomThreshold + 'px');
  }
}
