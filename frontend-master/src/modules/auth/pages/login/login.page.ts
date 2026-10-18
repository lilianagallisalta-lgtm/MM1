import {Component, OnDestroy} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.page.html',
})
export class LoginPage {
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

  signup() {
    this.navCtrl.setRoot('SignupPage');
  }
}
