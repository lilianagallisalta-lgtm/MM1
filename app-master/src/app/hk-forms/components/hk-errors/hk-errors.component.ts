import {Component, forwardRef, Host, Input, OnDestroy, OnInit, Optional, SkipSelf} from '@angular/core';
import {AbstractControl, FormControlName, FormGroupDirective, NgControl} from '@angular/forms';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {HkMutationDirective} from '../hk-mutation/hk-mutation.directive';
import {GraphqlErrorsStore, HawkqlOperation} from '../../state/graphql-errors/graphql-errors.store';
import {GraphqlErrorsQuery} from '../../state/graphql-errors/graphql-errors.query';
import {map} from 'rxjs/operators';

@Component({
  selector: 'hk-errors',
  templateUrl: './hk-errors.component.html',
  styleUrls: ['./hk-errors.component.scss'],
  providers: [
    {
      provide: NgControl,
      useExisting: forwardRef(() => FormControlName),
    },
  ],
})
export class HkErrorsComponent implements OnInit, OnDestroy {

  /**
   * Nombre del `FormControl` al que está asociado.
   */
  @Input() control: string;

  /**
   * `key` del error en la respuesta de graphql.
   */
  @Input() key: string;

  /**
   * Indica si éste componente debe mostrar los errores que no hayan sido mostrados por otros componentes.
   */
  @Input() fallback: boolean = false;

  hkMutation: HkMutationDirective;
  errors: any;
  operationName: string;

  _formDirective: FormGroupDirective;
  _formControl: AbstractControl;

  constructor(
    @Optional() @Host() @SkipSelf() form: FormGroupDirective,
    @Optional() @Host() @SkipSelf() hkMutation: HkMutationDirective,
    private graphqlErrorsStore: GraphqlErrorsStore,
    private graphqlErrorsQuery: GraphqlErrorsQuery,
  ) {
    this._formDirective = form;

    this.hkMutation = hkMutation;
  }

  ngOnInit() {
    this.operationName = this.hkMutation.operationName;

    this._log('init', this);

    this._formControl = this._formDirective.form.get(this.control);

    if (this.control) {
      this.setControlListeners();
    }

    if (this.key && this.operationName) {
      this.listenErrorsByKey();
    }
  }

  ngOnDestroy() { }

  /**
   * Si se asoció a un FormControl, se subscribe a sus eventos.
   */
  setControlListeners() {
    if (! this._formControl) {
      console.error('[hk-errors] control ' + this.control + ' not found');
      return;
    }

    this._formDirective
      .ngSubmit
      .pipe(untilDestroyed(this))
      .subscribe((status) => {
        this.setErrors();
      });

    this._formControl
      .statusChanges
      .pipe(untilDestroyed(this))
      .subscribe((status) => {
        this.setErrors();
      });

    this._formControl
      .valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.cleanErrors();
      });
  }

  listenErrorsByKey() {
    this._log('listenErrorsByKey', this.operationName, this.key);
    setTimeout(() => {
      this.graphqlErrorsQuery
        .operations$
        .pipe(
          map(operations => {
            return operations
              .filter(operation => operation.name === this.operationName);
          }),
        )
        .subscribe((operations: HawkqlOperation[]) => {
          operations.forEach(operation => {
            const validationErrors = operation.errors;

            if (! validationErrors) {
              return;
            }

            if (this.key === '*') {
              const output = {};
              for (const k of validationErrors) {
                this._log('k', k);
                const errors = validationErrors[k];
                errors.foreach(e => {
                  output['_' + e.rule] = e.message;
                });
              }
              this.errors = output;
              this._log('errors', this.errors);
            }

            const keys = Object.keys(validationErrors);
            this._log('keys', keys, validationErrors);

            for (let i = 0; i < keys.length; i++) {
              const errorKey = keys[i];

              if (this.key === errorKey) {
                const errors = validationErrors[errorKey];
                const output = {};
                errors.forEach(e => {
                  output['_' + e.rule] = e.message;
                });
                this.errors = output;

                this._log('errors by key', this.errors);
              } else if (this.key.indexOf('*') > -1) {
                const root = this.key.substring(0, this.key.indexOf('*'));
                this._log('root', root);

                if (! this.errors) {
                  this.errors = {};
                }

                if (errorKey.indexOf(root) > -1) {
                  const errors = validationErrors[errorKey];
                  const output = {};
                  errors.forEach(e => {
                    output['_' + e.rule] = e.message;
                  });
                  this.errors = {
                    ...this.errors,
                    ...output,
                  };
                }
              }
            }
          });
        });
    }, 300);
  }

  // keyMatches(keyToCompare: string): boolean
  // {
  //   if (this.key.indexOf('*')) {
  //     return keyToCompare;
  //   }
  // }

  setErrors() {
    if (! this._formControl) {
      return;
    }

    this.errors = this._formControl.errors;

    this._log('errors', this.errors);
  }

  cleanErrors() {
    this.errors = null;
  }

  private _log(...args) {
    // console.debug('[hk-errors]', ...args);
  }

}
