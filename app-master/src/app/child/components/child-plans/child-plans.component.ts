import {Component, Input, OnInit} from '@angular/core';
import {Child, CreatePlanGQL, Plan, PlansGQL} from '../../../../graphql/generated/graphql';
import {NavController} from '@ionic/angular';
import {PlansQuery} from '../../../plan/state/plans.query';
import {PlansService} from '../../../plan/state/plans.service';

@Component({
  selector: 'app-child-plans',
  templateUrl: './child-plans.component.html',
  styleUrls: ['./child-plans.component.scss']
})
export class ChildPlansComponent implements OnInit {

  @Input() child: Child;

  plans$ = this.plansQuery.selectAll();

  loading$ = this.plansQuery.selectLoading();
  loading: boolean = false;

  constructor(
    private navCtrl: NavController,
    private plansGQL: PlansGQL,
    private createPlanGQL: CreatePlanGQL,
    private plansQuery: PlansQuery,
    private plansService: PlansService,
  ) { }

  ngOnInit() {
  }

  createPlan() {
    this.loading = true;
    this.plansService
      .performUpsert({
        childId: this.child.id,
      })
      .subscribe(
        (plan: Plan) => {
          this.navCtrl.navigateBack([
            '/children',
            this.child.id,
            'plans',
            plan.id,
          ]);
        },
        () => {
          this.loading = false;
        },
      );
  }

}
