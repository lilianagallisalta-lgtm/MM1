import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Child, ChildGQL, UsePromotionCodeGQL} from '../../../../graphql/generated/graphql';
import {Observable} from 'rxjs';
import {finalize, pluck, tap} from 'rxjs/operators';
import {ToastService} from '../../../shared/services/toast.service';
import {TranslateService} from '@ngx-translate/core';
import {IonContent, NavController} from '@ionic/angular';
import {ChildrenService} from '../../state/children/children.service';

@Component({
  selector: 'app-child-premium-code',
  templateUrl: './child-premium-code.page.html',
  styleUrls: ['./child-premium-code.page.scss'],
})
export class ChildPremiumCodePage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  public childId = this.activatedRoute.snapshot.paramMap.get('childId');

  form: FormGroup;
  child$: Observable<Child>;

  success: boolean = false;
  loading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private childGQL: ChildGQL,
    private usePromotionCodeGQL: UsePromotionCodeGQL,
    private toast: ToastService,
    private translate: TranslateService,
    private childrenService: ChildrenService,
  ) {
    this.form = this.fb.group({
      code: [null, Validators.required],
    });

    this.child$ = this.childGQL
      .fetch({
        childId: this.childId,
      })
      .pipe(
        pluck('data', 'child'),
        tap((child: Child) => {
          if (child.hasActiveLicense) {
            this.toast.show(
              this.translate.instant('¡Tu niñ@ ya tiene una licencia activa!')
            );
            this.navCtrl.back();
          }
        }),
      );
  }

  ngOnInit() {
  }

  submit() {
    this.loading = true;
    this.usePromotionCodeGQL
      .mutate({
        input: {
          childId: this.childId,
          code: this.form.get('code').value,
        },
      })
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(() => {
        this.content.scrollToTop(200);
        this.childrenService.fetchOne({childId: this.childId}, {forceFetch: true}).subscribe();
        this.success = true;
      });
  }

  goBack() {
    this.navCtrl.back();
  }

}
