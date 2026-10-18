import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RapiTipsQuery} from '../../state/rapi-tips.query';
import {NavController} from '@ionic/angular';
import {RapiTipsService} from '../../state/rapi-tips.service';

@Component({
  selector: 'app-rapitip',
  templateUrl: './rapitip.page.html',
  styleUrls: ['./rapitip.page.scss'],
})
export class RapitipPage implements OnInit {

  public rapiTipId = this.activatedRoute.snapshot.paramMap.get('rapiTipId');

  rapiTip$ = this.rapiTipsQuery.selectActive();

  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private rapiTipsQuery: RapiTipsQuery,
    private rapiTipsService: RapiTipsService,
  ) { }

  ngOnInit() {
    this.rapiTipsService
      .fetchOne({id: this.rapiTipId})
      .subscribe(
        () => {},
        () => this.navCtrl.back(),
      );
  }

}
