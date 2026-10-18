import {IonicErrorHandler} from "ionic-angular";

export class AppErrorHandler implements IonicErrorHandler {
  handleError(errors: any) {
    console.error(errors);
  }
}
