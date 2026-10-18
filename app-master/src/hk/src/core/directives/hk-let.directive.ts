import {Directive, TemplateRef, ViewContainerRef, OnInit, Input} from '@angular/core';

export type PathContext = {
  $implicit: any;
  [key: string]: any;
};

@Directive({
  selector: '[hkLet]'
})
export class HkLetDirective implements OnInit {

  @Input('hkLetFrom') from: any;

  @Input('hkLet')
  set let(value: any) {
    console.log(value);
  }

  constructor(private template: TemplateRef<PathContext>,
              private viewContainer: ViewContainerRef) {}
  ngOnInit() {

    this.viewContainer.createEmbeddedView(this.template,
      {
        $implicit: this.from,
        ...this.from
      });
  }
}