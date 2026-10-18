import {Component, OnInit} from '@angular/core';
import {SessionQuery} from '../../../auth/state/session.query';
import {SessionService} from '../../../auth/state/session.service';
import {first} from 'rxjs/operators';
import {User} from '../../../../graphql/generated/graphql';
import {NavController} from '@ionic/angular';
import {OnesignalService} from '../../../shared/services/onesignal.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  me$ = this.sessionQuery.me$;

  constructor(
    private navCtrl: NavController,
    private sessionQuery: SessionQuery,
    private sessionService: SessionService,
    // private onesignalService: OnesignalService,
  ) {
  }

  ngOnInit() {
    this.sessionService
      .check()
      .pipe(first())
      .subscribe((me: User) => {
        setTimeout(() => {
          if (! me) {
            this.navCtrl.navigateRoot(['/main']);
            return;
          }

          // this.onesignalService.register();
        }, 50);
      });
  }

}
