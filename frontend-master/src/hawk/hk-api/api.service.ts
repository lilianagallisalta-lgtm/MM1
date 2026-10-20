import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Response} from "@angular/http";
import {Toast} from "ionic-angular";
import {ToastService} from "../hk-providers/toast.service";

const getApiHost = (): string => {
  if (typeof window === 'undefined') {
    return 'https://mentesmejorando.hawk-srl.com';
  }

  const hostname = window.location.hostname;
  const protocol = window.location.protocol;

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost';
  }

  if (hostname.includes('github.io')) {
    return 'https://mentesmejorando.hawk-srl.com';
  }

  return `${protocol}//${hostname}`;
};

export const HOST = getApiHost();
export const BASE_URL = HOST.includes('localhost')
  ? `${HOST}:8000/`
  : (HOST.endsWith('/') ? HOST : `${HOST}/`);
export const IS_BROWSER: boolean = true;
export const IS_LOCAL: boolean = HOST.includes('localhost') || HOST.includes('127.0.0.1');

export const ECHO_SERVER_HOST = HOST;
export const API_URL = BASE_URL + 'api/v1/';
export const IS_CORDOVA: boolean = ! IS_BROWSER;

@Injectable()
export class ApiService {
  private logging: boolean = false;

  constructor(
    private http: HttpClient,
    private toast: ToastService,
  ) { }

  get(endpoint: string, request: any = {}) {
    console.log('GET', endpoint, request);
    return new Observable(observer => {
      let params = new HttpParams();

      for (let param in request) {
        if (request.hasOwnProperty(param)) {
          params = params.append(param, request[param]);
        }
      }

      this.http
        .get(API_URL + endpoint, {
          params: params,
        })
        .subscribe(res => {
          this.logging && console.log('GET', endpoint, request, res);
          observer.next(res);
          observer.complete();
        }, errors => {
          this.handleError(errors);
          observer.error(errors);
          observer.complete();
        });
    });
  }

  post(endpoint: string, body: any = {}, request: any = {}, showToast: boolean = false) {
    this.logging && console.log('POST', endpoint, request, showToast);

    let toast: Toast;

    if (showToast) {
      toast = this.toast.loading();
    }

    return new Observable(observer => {
      this.http
        .post(API_URL + endpoint, body, request)
        .subscribe(res => {
          this.logging && console.log('POST response', endpoint, request, res);

          if (toast) {
            toast.dismiss();
          }

          if (showToast) {
            this.toast.apiSuccess(res);
          }

          observer.next(res);

          observer.complete();
        }, errors => {
          this.handleError(errors);

          if (toast) {
            toast.dismiss();
          }

          if (showToast) {
            this.toast.apiError(errors);
          }

          observer.error(errors);

          observer.complete();
        });
    });
  }

  put(endpoint: string, body: any = {}, request: any = {}, showToast: boolean = false) {
    this.logging && console.log('PUT', endpoint, request);

    let toast: Toast;

    if (showToast) {
      toast = this.toast.loading();
    }

    return new Observable(observer => {
      this.http
        .put(API_URL + endpoint, body, request)
        .subscribe(res => {
          this.logging && console.log('PUT response', endpoint, request, res);

          if (toast) {
            toast.dismiss();
          }

          if (showToast) {
            this.toast.apiSuccess(res);
          }

          observer.next(res);

          observer.complete();
        }, errors => {
          this.handleError(errors);

          if (toast) {
            toast.dismiss();
          }

          if (showToast) {
            this.toast.apiError(errors);
          }

          observer.error(errors);

          observer.complete();
        });
    });
  }

  delete(endpoint: string, showToast: boolean = false) {
    this.logging && console.log('DELETE', endpoint);

    let toast: Toast;

    if (showToast) {
      toast = this.toast.loading();
    }

    return new Observable(observer => {
      this.http
        .delete(API_URL + endpoint)
        .subscribe(res => {
          this.logging && console.log('DELETE response', endpoint, res);

          if (showToast) {
            toast.dismiss();
            this.toast.apiSuccess(res);
          }

          observer.next(res);

          observer.complete();
        }, errors => {
          this.handleError(errors);

          if (showToast) {
            toast.dismiss();
            this.toast.apiError(errors);
          }

          observer.error(errors);

          observer.complete();
        });
    });
  }

  handleError (response: Response | any) {
    // console.error(response.json());
  }
}
