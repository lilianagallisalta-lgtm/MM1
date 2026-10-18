import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Child} from '../../../../graphql/generated/graphql';
import {ChildrenService} from '../../state/children/children.service';
import {ChildrenQuery} from '../../state/children/children.query';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-child-upsert',
  templateUrl: './child-upsert.component.html',
  styleUrls: ['./child-upsert.component.scss']
})
export class ChildUpsertComponent implements OnInit {

  @Input() child: Child = <Child> {};

  form: FormGroup;

  loading: boolean = false;

  minDate = (new Date()).setFullYear((new Date()).getFullYear() - 8, (new Date()).getMonth(), (new Date()).getDay());

  maxDate = (new Date()).setFullYear((new Date()).getFullYear() - 1, (new Date()).getMonth(), (new Date()).getDay());

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private childrenQuery: ChildrenQuery,
    private childrenService: ChildrenService,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      id: [this.child.id],
      name: [this.child.name],
      birthdate: [this.child.birthdate],
      gender: [this.child.gender],
    });
  }

  submit() {
    this.loading = true;

    this.childrenService
      .createOrReplace(this.form.getRawValue())
      .subscribe((child: Child) => {
        if (this.child.id) {
          history.back();
        } else {
          this.navCtrl.navigateRoot(['/children/' + child.id, 'plans', child.currentPlan.id]);
        }
      }, () => {
        this.loading = false;
      });
  }

}
