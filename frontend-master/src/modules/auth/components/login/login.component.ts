import {
  Component, OnInit, Output,
  EventEmitter
} from "@angular/core";
import {Storage} from "@ionic/storage";
import {Apollo} from "apollo-angular";
import {LoadingService} from "../../../../hawk/hk-providers/loading.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import gql from "graphql-tag";

const SigninMutation = gql`
mutation SigninMutation ($input: SigninInput) {
  token: signin (input: $input)
}
`;

@Component({
  selector: 'login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  @Output() success: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  constructor(
    private apollo: Apollo,
    private storage: Storage,
    private loadingService: LoadingService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  submit() {
    this.loadingService.present();

    this.apollo
      .mutate({
        mutation: SigninMutation,
        variables: {
          input: {
            ...this.form.getRawValue(),
          },
        },
      })
      .subscribe(({data}) => {
        this.storage.set('token', data.token).then(() => {
          this.apollo.getClient().resetStore().then(() => {
            this.success.emit(data);

            this.loadingService.dismiss();
          });
        });
      }, (errors) => {
        this.loadingService.dismiss();
      });
  }
}
