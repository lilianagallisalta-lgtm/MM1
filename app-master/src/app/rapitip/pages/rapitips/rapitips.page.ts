import {Component, OnInit} from '@angular/core';
import {RapiTipsQuery} from '../../state/rapi-tips.query';
import {RapiTipsService} from '../../state/rapi-tips.service';
import {FetchAllStrategy} from '../../../../hawkql/api/types';
import {NavController} from '@ionic/angular';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-rapitips',
  templateUrl: './rapitips.page.html',
  styleUrls: ['./rapitips.page.scss'],
})
export class RapitipsPage implements OnInit {

  loading$ = this.rapiTipsQuery.selectLoading();
  rapiTips$ = this.rapiTipsQuery.selectAll();
  paginatorInfo$ = this.rapiTipsQuery.selectPaginatorInfo();

  constructor(
    private navCtrl: NavController,
    private rapiTipsQuery: RapiTipsQuery,
    private rapiTipsService: RapiTipsService,
  ) { }

  ngOnInit() {
    this.rapiTipsService.fetchAll({page: 1}, {strategy: FetchAllStrategy.PAGINATE}).subscribe();
  }

  paginate($event, page) {
    this.rapiTipsService
      .fetchAll({page: page}, {strategy: FetchAllStrategy.PAGINATE})
      .pipe(
        finalize(() => $event.target.complete()),
      )
      .subscribe();
  }

}
