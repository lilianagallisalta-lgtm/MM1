import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  templateUrl: './loading-overlay.component.html',
})
export class LoadingOverlayComponent implements OnInit {

  @Input() loading: boolean = true;

  constructor() { }

  ngOnInit() { }

}
