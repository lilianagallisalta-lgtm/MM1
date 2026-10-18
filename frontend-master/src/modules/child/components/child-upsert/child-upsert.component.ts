import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Apollo} from "apollo-angular";
import {Child, UpsertChildGQL} from "../../../../graphql/graphql";
import {ChildrenStore} from "../../state/children.store";

@Component({
  selector: 'child-upsert',
  templateUrl: 'child-upsert.component.html',
})
export class ChildUpsertComponent implements OnInit {
  @Input() child: Child = <Child>{};

  @Output() success: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  constructor(
    private apollo: Apollo,
    private fb: FormBuilder,
    private upsertChildGQL: UpsertChildGQL,
    private childrenStore: ChildrenStore,
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      id: [this.child.id],
      name: [this.child.name, Validators.required],
      age: [this.child.age, [Validators.required, Validators.min(1), Validators.max(7)]],
    });
  }

  submit() {
    this.upsertChildGQL
      .mutate({
        input: this.form.getRawValue(),
      })
      .subscribe(({data}) => {
        this.childrenStore.createOrReplace(data.upsertChild.id, data.upsertChild);
        this.success.emit(data);
      });
  }
}
