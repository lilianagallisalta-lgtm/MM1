import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChildrenService} from '../../state/children/children.service';
import {ChildrenQuery} from '../../state/children/children.query';
import {Child} from '../../../../graphql/generated/graphql';
import {NavController} from '@ionic/angular';
import {PlansService} from '../../../plan/state/plans.service';

@Component({
  selector: 'app-child-see',
  templateUrl: './child-see.page.html',
  styleUrls: ['./child-see.page.scss'],
})
export class ChildSeePage implements OnInit, OnDestroy {

  public childId = this.activatedRoute.snapshot.paramMap.get('childId');

  child$ = this.childrenQuery.selectActive();

  loading$ = this.childrenQuery.selectLoading();

  constructor(
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    private childrenService: ChildrenService,
    private childrenQuery: ChildrenQuery,
    private plansService: PlansService,
  ) { }

  ngOnInit() {
    this.childrenService.fetchOne({childId: this.childId}, {forceFetch: true}).subscribe();
    this.plansService.fetchAllByChild({childId: this.childId}, {forceFetch: true}).subscribe();
  }

  ngOnDestroy() {
  }

}
