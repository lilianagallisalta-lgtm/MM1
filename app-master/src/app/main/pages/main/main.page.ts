import {Component, OnInit} from '@angular/core';
import {MediaObserver} from '@angular/flex-layout';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  constructor(
    public media: MediaObserver,
  ) { }

  ngOnInit() {
    const videoElement = <HTMLVideoElement> document.getElementById('video');
    if (videoElement) {
      videoElement.play();
    }
  }

}
