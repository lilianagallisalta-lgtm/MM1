import {Directive, Host, Input, OnInit, Optional} from '@angular/core';
import {FormGroupDirective} from '@angular/forms';
import {GraphqlErrorsQuery} from '../../state/graphql-errors/graphql-errors.query';
import {GraphqlErrorsStore, HawkqlOperation} from '../../state/graphql-errors/graphql-errors.store';

@Directive({
  exportAs: 'hkMutation',
  selector: '[hkMutation]',
})
export class HkMutationDirective implements OnInit {

  @Input('hkMutation') operationName: string;

  _formDirective: FormGroupDirective;

  constructor(
    @Optional() @Host() parent: FormGroupDirective,
    private graphqlErrorsStore: GraphqlErrorsStore,
    private graphqlErrorsQuery: GraphqlErrorsQuery,
  ) {
    this._formDirective = parent;
  }

  ngOnInit() {
    setTimeout(() => {
      this.graphqlErrorsQuery
        .operations$
        .subscribe((operations: HawkqlOperation[]) => {
          operations.forEach(operation => {
            if (operation.name === this.operationName) {
              this.handleErrors(operation.errors);
            }
          });
        });
    }, 300);
  }

  handleErrors(validationErrors: any[]) {
    this._log('handleErrors', validationErrors);

    if (! validationErrors) {
      return;
    }

    this.setErrorsToControls(validationErrors);
  }

  setErrorsToControls(validationErrors: any[]) {
    const controls = Object.keys(validationErrors);
    for (let i = 0; i < controls.length; i++) {
      const control = controls[i];
      const errors = validationErrors[control];

      const output = {};

      errors.forEach(e => {
        // A las reglas que provengan del backend se les pone el prefijo `_`
        // para poder diferenciarlas de las que se definen en Angular.
        output['_' + e.rule] = e.message;
      });

      this._log(this.operationName, output);

      const formControl = this._formDirective.form.get(control);
      if (formControl) {
        formControl.setErrors(output);
      }
    }
  }

  _log(...args) {
    // console.debug('[hk-mutation]', ...args);
  }

}
