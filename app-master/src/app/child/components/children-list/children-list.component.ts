import {Component, OnInit} from '@angular/core';
import {ChildrenQuery} from '../../state/children/children.query';
import {NavController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {Child} from '../../../../graphql/generated/graphql';
import {ChildrenService} from '../../state/children/children.service';

@Component({
  selector: 'app-children-list',
  templateUrl: './children-list.component.html',
  styleUrls: ['./children-list.component.scss']
})
export class ChildrenListComponent implements OnInit {

  children$ = this.childrenQuery.selectAll();
  loading$ = this.childrenQuery.selectLoading();

  constructor(
    private navCtrl: NavController,
    private childrenQuery: ChildrenQuery,
    private childrenService: ChildrenService,
  ) { }

  ngOnInit() {
    this.childrenService.fetchAll({}, {forceFetch: true}).subscribe();
  }

  see(child: Child) {
    if (child && child.currentPlan) {
      this.navCtrl.navigateForward(['/children', child.id, 'plans', child.currentPlan.id]);
    } else {
      this.navCtrl.navigateForward(['/children', child.id]);
    }
  }

}
