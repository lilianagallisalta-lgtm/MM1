import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {Child, ChildGQL, LicenseGQL, PurchaseLicenseGQL} from '../../../../graphql/generated/graphql';
import {IonContent, NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {pluck, tap} from 'rxjs/operators';
import {ToastService} from '../../../shared/services/toast.service';
import {TranslateService} from '@ngx-translate/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ChildrenService} from '../../state/children/children.service';

@Component({
  selector: 'app-purchase-license',
  templateUrl: './purchase-license.page.html',
  styleUrls: ['./purchase-license.page.scss'],
  animations: [
    trigger('card', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(100%)',
      })),
      state('*', style({
        opacity: 1,
        transform: 'translateY(0)',
      })),
      transition('void <=> *', animate('200ms ease-in-out')),
    ]),
  ],
})
export class PurchaseLicensePage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  public childId: string = this.route.snapshot.paramMap.get('childId');
  planId: string;

  child$: Observable<Child>;

  purchased: boolean = false;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private licenseGQL: LicenseGQL,
    private purchaseLicenseGQL: PurchaseLicenseGQL,
    private childGQL: ChildGQL,
    private toast: ToastService,
    private translate: TranslateService,
    private childrenService: ChildrenService,
  ) { }

  ngOnInit() {
    this.child$ = this.childGQL
      .fetch({
        childId: this.childId,
      })
      .pipe(
        pluck('data', 'child'),
        tap((child: Child) => {
          this.planId = child && child.currentPlan ? child.currentPlan.id : null;

          if (child.hasActiveLicense) {
            this.toast.show(
              this.translate.instant('¡Tu niñ@ ya tiene una licencia activa!')
            );
            this.navCtrl.back();
          }
        }),
      );
  }

  _purchased() {
    this.content.scrollToTop(200);
    this.childrenService.fetchOne({childId: this.childId}, {forceFetch: true}).subscribe();
    this.purchased = true;
  }

  goBack() {
    if (this.planId) {
      this.navCtrl.navigateBack(['/children', this.childId, 'plans', this.planId]);
    } else {
      this.navCtrl.navigateBack(['/children', this.childId]);
    }
  }

}
