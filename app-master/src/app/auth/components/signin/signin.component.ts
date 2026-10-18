import { Component, OnInit } from '@angular/core';
import {Platform} from '@ionic/angular';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SessionService} from '../../state/session.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  form: FormGroup;

  constructor(
    private platform: Platform,
    private sessionService: SessionService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
    this.sessionService.signin({
      input: this.form.getRawValue(),
    });
  }

}
