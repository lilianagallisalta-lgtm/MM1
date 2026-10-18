import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {ToastService} from '../../../shared/services/toast.service';
import {debounceTime, finalize, pluck} from 'rxjs/operators';
import {PurchaseLicenseGQL} from '../../../../graphql/generated/graphql';

declare var Mercadopago: any;

@Component({
  selector: 'app-checkout-mercadopago',
  templateUrl: './checkout-mercadopago.component.html',
  styleUrls: ['./checkout-mercadopago.component.scss']
})
export class CheckoutMercadopagoComponent implements OnInit {

  @Input() childId: string;

  @Input() amount: number;

  @Output() success: EventEmitter<any> = new EventEmitter();

  @ViewChild('cardFormElement') cardFormElement: ElementRef;

  form: FormGroup;
  cardForm: FormGroup;

  dniTypes: any;
  card: any = {};
  installments: any = null;

  _step = 0;

  /**
   * Indica si hubo un error.
   * Si hubo un error, cuando quiere hacer submit vuelve a pedir el token
   * a MP, los installments y luego se hace submit (ya que el token que había
   * quedó invalidado cuando se produjo el error).
   * @type {boolean}
   * @private
   */
  _hasErrors = false;

  _loading: boolean = false;
  _loadingInstallments: boolean = false;
  _installmentsErrors: boolean = false;

  constructor(
    private fb: FormBuilder,
    private toast: ToastService,
    private purchaseLicenseGQL: PurchaseLicenseGQL,
  ) { }

  ngOnInit() {
    this.cardForm = this.fb.group({
      cardNumber: [],
      securityCode: [],
      cardholderName: [],
      cardExpirationMonth: [],
      cardExpirationYear: [],
      docType: [],
      docNumber: [],
    });

    this.cardForm
      .get('cardNumber')
      .valueChanges
      .pipe(debounceTime(300))
      .subscribe((cardNumber) => {
        if (! cardNumber) {
          this.installments = null;
          this._loadingInstallments = false;
          return;
        }

        const bin = cardNumber.replace(/[ .-]/g, '').slice(0, 6);

        if (bin.length >= 6) {
          this.getInstallments(bin);
        } else {
          this.installments = null;
          this._loadingInstallments = false;
        }
      });

    this.form = this.fb.group({
      childId: [this.childId],
      token: [],
      installments: [],
      paymentMethodId: [],
    });

    this.reset();
  }

  reset() {
    if (this.hasMercadoPago()) {
      Mercadopago.setPublishableKey(environment.mercadopago.publicKey);

      Mercadopago.getIdentificationTypes((status, response) => {
        if (status !== 200) {
          this.handleMercadopagoError(response, 'cardToken');
          return;
        }

        this.dniTypes = response;
      });

      this._step = 1;
    } else {
      this.notifyUnavailablePayment();
    }

    if (! environment.production) {
      this.cardForm.get('cardNumber').setValue('4509953566233704');
      this.cardForm.get('securityCode').setValue('123');
      this.cardForm.get('cardholderName').setValue('APRO');
      this.cardForm.get('cardExpirationMonth').setValue('12');
      this.cardForm.get('cardExpirationYear').setValue('2019');
      this.cardForm.get('docType').setValue('DNI');
      this.cardForm.get('docNumber').setValue('40123123');
    }
  }

  submit() {
    if (!this.hasMercadoPago()) {
      this.notifyUnavailablePayment();
      return;
    }

    this.presentLoading();

    try {
      this._log('submitCard', this.cardFormElement.nativeElement);

      Mercadopago.createToken(this.cardFormElement.nativeElement, (status, response) => {
        this._log('createToken response', response);

        if (status !== 200) {
          this.handleMercadopagoError(response, 'cardToken');
          this.dismissLoading();
          return;
        }

        this.form.get('token').setValue(response.id);

        this.purchaseLicenseGQL
          .mutate({
            input: this.form.getRawValue(),
          })
          .pipe(
            pluck('data', 'purchaseLicense'),
            finalize(() => {
              if (this.hasMercadoPago()) {
                Mercadopago.clearSession();
              }
            }),
          )
          .subscribe(() => {
            this.success.emit();
          }, () => {
            this.dismissLoading();
          });
      });
    } catch (e) {
      this.toast.error('Revisa los datos de tu tarjeta');
      this.handleMercadopagoError(e, 'cardToken');
      this.dismissLoading();
    }
  }

  private getInstallments(bin) {
    this._loadingInstallments = true;
    this._installmentsErrors = false;

    if (!this.hasMercadoPago()) {
      this.notifyUnavailablePayment();
      this._loadingInstallments = false;
      this._installmentsErrors = true;
      return;
    }

    try {
      Mercadopago.getInstallments({
        bin: bin,
        amount: this.amount,
      }, (status, response) => {
        this._log('getInstallments response', response);

        if (status !== 200) {
          this.handleMercadopagoError(response, 'pay');
          this.dismissLoading();
          return;
        }

        this.installments = response[0].payer_costs;
        this.form.get('paymentMethodId').setValue(response[0].payment_method_id);
        this._loadingInstallments = false;
        this._installmentsErrors = false;
      });
    } catch (e) {
      this.installments = null;
      this._loadingInstallments = false;
      this._installmentsErrors = true;
      this.handleMercadopagoError(e, 'pay');
    }
  }

  private handleMercadopagoError(errors: any, key: string) {
    this._log('handlerMercadopagoError', errors, key);

    // if (! errors) {
    //   return this.toast.error(this.translate.instant('mercadopago.error.' + key + '.default'));
    //
    // }
    // if (errors && errors.cause) {
    //   return this.toast.error(this.translate.instant(`mercadopago.error.${key}.${errors.cause[0].code}`));
    //
    // }
    //
    // return this.toast.error(this.translate.instant('mercadopago.error.unknown'));
  }

  private notifyUnavailablePayment() {
    if (environment.production) {
      this.toast.checkInternet();
      return;
    }

    this.toast.error('Los pagos con tarjeta no están disponibles en modo local.');
  }

  private hasMercadoPago() {
    return typeof Mercadopago !== 'undefined' && !!Mercadopago;
  }

  private _log(...args) {
    // console.debug('[mp]', ...args);
  }

  private presentLoading() {
    this._loading = true;
  }

  private dismissLoading() {
    this._loading = false;
  }

}
