import {Component, OnDestroy} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";
import gql from "graphql-tag";
import {MediaService} from "@angular/flex-layout";

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.page.html',
})
export class DashboardPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private media: MediaService,
  ) {
  }

  ionViewDidLoad() {
  }

  addChild() {
    this.navCtrl.push('ChildCreatePage');
  }
}
