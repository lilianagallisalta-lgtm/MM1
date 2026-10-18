import {Input, ElementRef, Directive, Renderer2, OnInit} from "@angular/core";

@Directive({
  selector: '[hkBottomThresholdMargin]'
})
export class HkBottomThresholdMargin implements OnInit {
  @Input() hkBottomThreshold: number = 36;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {
  }

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'margin-bottom', this.hkBottomThreshold + 'px');
  }
}
