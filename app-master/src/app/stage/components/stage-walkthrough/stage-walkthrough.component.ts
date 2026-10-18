import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {IonSlides} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-stage-walkthrough',
  templateUrl: './stage-walkthrough.component.html',
  styleUrls: ['./stage-walkthrough.component.scss']
})
export class StageWalkthroughComponent implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  @Output() success: EventEmitter<any> = new EventEmitter();

  loading: boolean = false;

  constructor(
    private storage: Storage,
  ) { }

  ngOnInit() {
    this.slides.options = {
      allowTouchMove: false,
    };
  }

  async submit() {
    this.loading = true;
    await this.storage.set('stagesWalkthroughConfirmed', true);
    this.success.next();
  }

}
