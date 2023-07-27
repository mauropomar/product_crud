import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProductReducer from './app.reducer';

export interface AppState {
  products: fromProductReducer.ProductState;
}

export const reducers = {
  products: fromProductReducer.reducer,
};

export const getState = (state) => state;
export const getProductState =
  createFeatureSelector<fromProductReducer.ProductState>('products');

export const getProducts = createSelector(
  getProductState,
  fromProductReducer.getProducts
);
export const getProductById = (id) =>
  createSelector(getProducts, (products) => {
    if (products) {
      const productFound = products.find((p) => p.id === id);
      return productFound || {};
    } else {
      return {};
    }
  });
