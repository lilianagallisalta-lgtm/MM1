import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SessionService} from '../../state/session.service';
import {SessionQuery} from '../../state/session.query';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;

  constructor(
    private sessionQuery: SessionQuery,
    private sessionService: SessionService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['', [Validators.required]],
      province: ['', [Validators.required]],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
      acceptTos: [false, Validators.required],
    });
  }

  async submit() {
    this.loading = true;
    this.sessionService
      .signup({
        input: this.form.getRawValue(),
      })
      .subscribe(() => {}, () => this.loading = false);
  }

}
