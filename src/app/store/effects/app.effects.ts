import { ProductService } from './../../services/product.service';
import { switchMap, map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as fromProductsActions from '../actions/product.action';

@Injectable()
export class ProductEffects {

    constructor(private actions$: Actions, private productservice: ProductService) {}

    @Effect()
    loadProducts$ : Observable<Action> = this.actions$.pipe(
        ofType(fromProductsActions.LOAD_PRODUCTS),
        switchMap(() => this.productservice.getProducts()
        .pipe(
            map(response => {
                return new fromProductsActions.LoadProductSuccess(response)
            },
            catchError(error => of(new fromProductsActions.LoadProductFail(error)))
            )
         )
        )
    );

    // Update Product
    @Effect()
    updateCustomer$ : Observable<Action> = this.actions$.pipe(
        ofType(fromProductsActions.UPDATE_PRODUCT),
        map((action : fromProductsActions.UpdateProduct) => action.payload),
        switchMap((payload) => this.productservice.updateProduct(payload)
            .pipe(
                map(response => new fromProductsActions.UpdateProductSuccess(response)
            ),
            catchError(error => of(new fromProductsActions.UpdateProductFail(error))
        ))
      )
    );

    // Add Product
    @Effect()
    addProduct$ : Observable<Action> = this.actions$.pipe(
        ofType(fromProductsActions.ADD_PRODUCT),
        map((action : fromProductsActions.AddProduct) => action.payload),
        switchMap((payload) => this.productservice.addProduct(payload)
            .pipe(
                map(response => new fromProductsActions.AddProductSuccess(response)
            ),
            catchError(error => of(new fromProductsActions.AddProductFail(error))
        ))
      )
    );

    // Delete Product

   @Effect()
    deleteCustomer$ : Observable<Action> = this.actions$.pipe(
        ofType(fromProductsActions.DELETE_PRODUCT),
        map((action : fromProductsActions.DeleteProduct) => action.payload),
        switchMap((payload : number) => this.productservice.deleteProduct(payload)
            .pipe(
                map(()=> new fromProductsActions.DeleteProductSuccess(payload)
            ),
            catchError(error => of(new fromProductsActions.DeleteProductFail(error))
        ))
      )
    );



}
