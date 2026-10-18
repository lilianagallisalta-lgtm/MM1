import {
  Component, OnInit, Output,
  EventEmitter, Input
} from "@angular/core";
import gql from "graphql-tag";
import {Apollo} from "apollo-angular";
import {Storage} from "@ionic/storage";
import {LoadingService} from "../../../../hawk/hk-providers/loading.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

const SignupMutation = gql`
mutation SignupMutation ($input: SignupInput) {
  token: signup(input: $input)
}
`;

@Component({
  selector: 'sign-up',
  templateUrl: 'sign-up.component.html'
})
export class SignUpComponent implements OnInit {
  @Input() type: 'particular' | 'professional' = 'particular';

  @Output() success: EventEmitter<any> = new EventEmitter();

  form: FormGroup;

  constructor(
    private apollo: Apollo,
    private storage: Storage,
    private loadingService: LoadingService,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  submit() {
    this.loadingService.present();

    this.apollo.mutate({
      mutation: SignupMutation,
      variables: {
        input: {
          ...this.form.getRawValue(),
        },
      },
    }).subscribe(({ data }) => {
      this.storage.set('token', data.token).then(() => {
        this.apollo.getClient().resetStore().then(() => {
          this.success.emit(data);

          this.loadingService.dismiss();
        });
      });
    },(error) => {
      this.loadingService.dismiss();
    });
  }

  indexChange(index: number) {
    this.type = index == 0 ? 'particular' : 'professional';
  }
}
