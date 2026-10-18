import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Child, ChildWithHistoryGQL} from '../../../../graphql/generated/graphql';
import {Observable} from 'rxjs';
import {pluck, tap} from 'rxjs/operators';
import {Platform} from '@ionic/angular';
import {MediaObserver} from '@angular/flex-layout';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-child-history',
  templateUrl: './child-history.page.html',
  styleUrls: ['./child-history.page.scss'],
})
export class ChildHistoryPage implements OnInit, OnDestroy {

  data: any;
  child$: Observable<Child>;
  width: number;

  constructor(
    private platform: Platform,
    private route: ActivatedRoute,
    private childWithHistoryGQL: ChildWithHistoryGQL,
    private media: MediaObserver,
  ) {
    this.media
      .media$
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.width = this.platform.width();
      });
  }

  ngOnInit() {
    this.child$ = this.childWithHistoryGQL
      .fetch({
        id: this.route.snapshot.paramMap.get('childId'),
      }, {'fetchPolicy': 'network-only'})
      .pipe(
        pluck('data', 'child'),
        tap((child: Child) => {
          this.data = JSON.parse(child.history);
        }),
      );
  }

  ngOnDestroy() {
  }

}
