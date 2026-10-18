import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Game} from '../../../../graphql/generated/graphql';

@Component({
  selector: 'app-result-games',
  templateUrl: './result-games.component.html',
  styleUrls: ['./result-games.component.scss']
})
export class ResultGamesComponent implements OnInit {

  @Input() games: Game[];

  @ViewChild('scrollContent') scrollContent: ElementRef;

  scrollDelta: number = 150;

  constructor() { }

  ngOnInit() {
  }

  scrollLeft() {
    this.scrollContent.nativeElement.scrollLeft -= this.scrollDelta;
  }

  scrollRight() {
    this.scrollContent.nativeElement.scrollLeft += this.scrollDelta;
  }

}
