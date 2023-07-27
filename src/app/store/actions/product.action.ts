import { Action } from '@ngrx/store';
import { Product } from '../../models/product.model';

export const LOAD_PRODUCTS = '[Product] Load products';
export const LOAD_PRODUCTS_SUCCESS = '[Product] Load products success';
export const LOAD_PRODUCTS_FAIL = '[Product] Load products fail';

/* ADD PRODUCT */
export const ADD_PRODUCT = '[Product] add product';
export const ADD_PRODUCT_SUCCESS = '[Product] add product success';
export const ADD_PRODUCT_FAIL = '[Product] add product fail';

/* UPDATE PRODUCT */
export const UPDATE_PRODUCT = '[Product] update product';
export const UPDATE_PRODUCT_SUCCESS = '[Product] update product success';
export const UPDATE_PRODUCT_FAIL = '[Product] update product fail';

/* DELETE PRODUCT */
export const DELETE_PRODUCT = '[Product] delete product';
export const DELETE_PRODUCT_SUCCESS = '[Product] delete product success';
export const DELETE_PRODUCT_FAIL = '[Product] delete product fail';

export class LoadProduct implements Action {
  readonly type = LOAD_PRODUCTS;
}

export class LoadProductSuccess implements Action {
  readonly type = LOAD_PRODUCTS_SUCCESS;
  constructor(public payload: Product[]) {}
}

export class LoadProductFail implements Action {
  readonly type = LOAD_PRODUCTS_FAIL;
  constructor(public payload: any[]) {}
}

export class UpdateProduct implements Action {
  readonly type = UPDATE_PRODUCT;

  constructor(public payload: Product) {}
}

export class UpdateProductSuccess implements Action {
  readonly type = UPDATE_PRODUCT_SUCCESS;

  constructor(public payload: any) {}
}

export class UpdateProductFail implements Action {
  readonly type = UPDATE_PRODUCT_FAIL;

  constructor(public payload: any) {}
}

export class AddProduct implements Action {
  readonly type = ADD_PRODUCT;

  constructor(public payload: Product) {}
}

export class AddProductSuccess implements Action {
  readonly type = ADD_PRODUCT_SUCCESS;

  constructor(public payload: any) {}
}

export class AddProductFail implements Action {
  readonly type = ADD_PRODUCT_FAIL;

  constructor(public payload: any) {}
}

export class DeleteProduct implements Action {
  readonly type = DELETE_PRODUCT;

  constructor(public payload: number) {}
}

export class DeleteProductSuccess implements Action {
  readonly type = DELETE_PRODUCT_SUCCESS;

  constructor(public payload: any) {}
}

export class DeleteProductFail implements Action {
  readonly type = DELETE_PRODUCT_FAIL;

  constructor(public payload: any) {}
}

export type ProductActions =
  | LoadProduct
  | LoadProductSuccess
  | UpdateProduct
  | UpdateProductSuccess
  | UpdateProductFail
  | AddProduct
  | AddProductSuccess
  | AddProductFail
  | DeleteProduct
  | DeleteProductSuccess
  | DeleteProductFail;
