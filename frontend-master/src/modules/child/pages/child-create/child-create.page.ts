import {Component} from "@angular/core";
import {IonicPage, NavController, NavParams} from "ionic-angular";

@IonicPage({
  segment: 'child-create',
  defaultHistory: [
    'DashboardPage',
  ],
})
@Component({
  selector: 'page-child-create',
  templateUrl: 'child-create.page.html',
})
export class ChildCreatePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
  }

  ionViewDidLoad() {
  }

  success(data) {
    this.navCtrl.pop().then(() => {
      this.navCtrl.push('ChildPage', {
        childId: data.upsertChild.id,
      });
    });
  }
}
