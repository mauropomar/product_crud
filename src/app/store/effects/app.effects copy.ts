import { CustomerService } from './../../services/customer.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromCustomersActions from '../actions/customer.action';

@Injectable()
export class CustomerEffects {

    constructor(private actions$: Actions, private customerservice: CustomerService) {}

    @Effect()
    loadCustomers$ : Observable<Action> = this.actions$.pipe(
        ofType(fromCustomersActions.LOAD_CUSTOMERS),
        switchMap(() => this.customerservice.getCustomers()
        .pipe(
            map(response => {
                return new fromCustomersActions.LoadCustomerSuccess(response)
            },
            catchError(error => of(new fromCustomersActions.LoadCustomerFail(error)))
            )
         )
        )
    );

    // Update Customer
    @Effect()
    updateCustomer$ : Observable<Action> = this.actions$.pipe(
        ofType(fromCustomersActions.UPDATE_CUSTOMER),
        map((action : fromCustomersActions.UpdateCustomer) => action.payload),
        switchMap((payload) => this.customerservice.updateCustomer(payload)
            .pipe(
                map(response => new fromCustomersActions.UpdateCustomerSuccess(response)
            ),
            catchError(error => of(new fromCustomersActions.UpdateCustomerFail(error))
        ))
      )
    );

    // Add Customer
    @Effect()
    addCustomer$ : Observable<Action> = this.actions$.pipe(
        ofType(fromCustomersActions.ADD_CUSTOMER),
        map((action : fromCustomersActions.AddCustomer) => action.payload),
        switchMap((payload) => this.customerservice.addCustomer(payload)
            .pipe(
                map(response => new fromCustomersActions.AddCustomerSuccess(response)
            ),
            catchError(error => of(new fromCustomersActions.AddCustomerFail(error))
        ))
      )
    );

    // Delete Customer

   @Effect()
    deleteCustomer$ : Observable<Action> = this.actions$.pipe(
        ofType(fromCustomersActions.DELETE_CUSTOMER),
        map((action : fromCustomersActions.DeleteCustomer) => action.payload),
        switchMap((payload : number) => this.customerservice.deleteCustomer(payload)
            .pipe(
                map(()=> new fromCustomersActions.DeleteCustomerSuccess(payload)
            ),
            catchError(error => of(new fromCustomersActions.DeleteCustomerFail(error))
        ))
      )
    );



}
