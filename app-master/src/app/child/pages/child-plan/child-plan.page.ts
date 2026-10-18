import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {ChildrenService} from '../../state/children/children.service';
import {ChildrenQuery} from '../../state/children/children.query';
import {PlansQuery} from '../../../plan/state/plans.query';
import {PlansService} from '../../../plan/state/plans.service';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {Child, Plan, Stage} from '../../../../graphql/generated/graphql';
import {ToastService} from '../../../shared/services/toast.service';
import {environment} from '../../../../environments/environment';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';

interface DemoAccessResponse {
  data?: {
    grantDemoAccess: {
      id: string;
      hasActiveLicense: boolean;
    } | null;
  };
  errors?: Array<{message: string}>;
}

@Component({
  selector: 'app-child-plan',
  templateUrl: './child-plan.page.html',
  styleUrls: ['./child-plan.page.scss'],
})
export class ChildPlanPage implements OnInit, OnDestroy {

  plan$ = this.plansQuery.selectActive();

  loading$ = this.plansQuery.selectLoading();

  isLocalDemo = !environment.production;
  trialLoading = false;

  /**
   * Indica si el niño tiene alguna etapa disponible o no.
   */
  someAvailable: boolean = true;

  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private childrenService: ChildrenService,
    private childrenQuery: ChildrenQuery,
    private plansQuery: PlansQuery,
    private plansService: PlansService,
    private apollo: Apollo,
    private toast: ToastService,
  ) { }

  ngOnInit() {
    const planId = this.activatedRoute.snapshot.paramMap.get('planId');
    this.plansService.fetchOne({planId: planId}).subscribe();
    this.plan$.pipe(untilDestroyed(this)).subscribe((plan: Plan) => {
      this.someAvailable = plan && plan.stages && plan.stages.data && plan.stages.data.length && plan.stages.data.filter(s => s.available === true).length > 0;
    });
  }

  ngOnDestroy() {
  }

  seeStage(stage: Stage, plan: Plan) {
    if (stage.available === true && stage.unlocked) {
      this.navCtrl.navigateForward(['/children', plan.child.id, 'plans', plan.id, 'stages', stage.id]);
    } else if (stage.available === false) {
      this.navCtrl.navigateForward(['/children', plan.child.id, 'purchase-license']);
    }
  }

  purchaseLicense(child: Child) {
    this.navCtrl.navigateForward(['/children', child.id, 'purchase-license']);
  }

  startLocalTrial(plan: Plan) {
    if (!this.isLocalDemo || !plan || !plan.child || !plan.id || this.trialLoading) {
      return;
    }

    this.trialLoading = true;
    this.apollo.mutate<DemoAccessResponse>({
      mutation: gql`
        mutation GrantDemoAccess($childId: ID!) {
          grantDemoAccess(childId: $childId) {
            id
            hasActiveLicense
          }
        }
      `,
      variables: {childId: plan.child.id},
    }).subscribe(({data, errors}) => {
      this.trialLoading = false;

      if (errors || !data || !data.grantDemoAccess
          || !data.grantDemoAccess.hasActiveLicense) {
        this.toast.error('No se pudo activar la prueba local de la app.');
        return;
      }

      this.childrenService.fetchAll({}, {forceFetch: true}).subscribe();
      this.plansService.fetchOne({planId: plan.id}, {forceFetch: true}).subscribe();
      this.toast.success('Prueba local activada. Ya puedes explorar la app.');
    }, error => {
      this.trialLoading = false;
      console.error('Local demo access activation failed:', error);
      this.toast.error('No se pudo conectar con la API local para activar la prueba.');
    });
  }

}