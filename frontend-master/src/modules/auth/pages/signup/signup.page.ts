import {Component, OnDestroy} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.page.html',
})
export class SignupPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
  }

  ionViewDidLoad() {
  }

  loggedIn() {
    this.navCtrl.setRoot('HomePage');
  }

  login() {
    this.navCtrl.setRoot('LoginPage');
  }
}
