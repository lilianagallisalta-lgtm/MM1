import {Component, OnInit, ViewChild} from '@angular/core';
import {IonSlides} from '@ionic/angular';

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: ['./walkthrough.page.scss'],
})
export class WalkthroughPage implements OnInit {

  @ViewChild('slides') _slides: IonSlides;

  showPrev: boolean = false;
  showNext: boolean = false;

  constructor() { }

  ngOnInit() {
    this._slides.options = {
      zoom: false,
    };

    this.slideChange();
  }

  async slideChange() {
    this.showPrev = ! await this._slides.isBeginning() && ! await this._slides.isEnd();
    this.showNext = ! await this._slides.isEnd();
  }

}
