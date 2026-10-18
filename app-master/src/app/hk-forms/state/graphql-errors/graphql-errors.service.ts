import {Injectable} from '@angular/core';
import {GraphqlErrorsStore, HawkqlError} from './graphql-errors.store';
import {first} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GraphqlErrorsService {

  constructor(private graphqlErrorsStore: GraphqlErrorsStore) {
  }

  addErrors(errors) {
    // this._log('addErrors', errors);
    this.graphqlErrorsStore.update(state => ({
      ...state,
      errors: errors,
    }));

    // let errors = [];
    //
    // for (let i = 0; i <= errors.length; i++) {
    //   const error = errors[i];
    //
    //
    // }
  }

  setErrors(operationName: string, validationErrors: any) {
    this.graphqlErrorsStore
      ._select(s => s)
      .pipe(first())
      .subscribe(s => {
        let operations = Object.assign([], s.operations);

        const currentOperation = operations.find(o => o.name === operationName);

        // let errors = [];
        // const controls = Object.keys(validationErrors.errors);
        //
        // console.debug('controls', controls);
        // console.debug('validationErrors', validationErrors.errors);
        //
        // controls.forEach(control => {
        //   const controlErrors = validationErrors.errors[control];
        //   console.debug('controlErrors', controlErrors);
        //
        //   controlErrors.forEach(e => {
        //     errors.push({
        //       key: control,
        //       display: e.message,
        //       rule: e.rule,
        //     });
        //   });
        // });

        // errors = errors.map((v, k) => {
        //   return {
        //     key: controls[k],
        //     display: v.display,
        //     rule: v.rule,
        //   };
        // });

        if (currentOperation) {
          operations = operations.map(o => {
            if (o.name === operationName) {
              return {
                name: operationName,
                errors: validationErrors,
              };
            } else {
              return o;
            }
          });
        } else {
          operations.push({
            name: operationName,
            errors: validationErrors,
          });
        }

        this.graphqlErrorsStore.update(state => ({
          ...state,
          operations: operations,
        }));
      });
  }

}
