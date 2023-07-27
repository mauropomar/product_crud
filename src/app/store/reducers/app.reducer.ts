import { Product } from './../../models/product.model';
import * as fromProductActions from '../actions/product.action';

export interface ProductState {
  data: Product[];
  loaded: boolean;
  loading: boolean;
  error: string;
}

export const initialState: ProductState = {
  data: [],
  loaded: false,
  loading: false,
  error: '',
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case fromProductActions.LOAD_PRODUCTS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromProductActions.LOAD_PRODUCTS_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        data,
      };
    }

    case fromProductActions.LOAD_PRODUCTS_FAIL: {
      const data = action.payload;
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }

    case fromProductActions.UPDATE_PRODUCT_SUCCESS: {
      let data = state.data.map((product) => {
        if (product.id === action.payload.id) {
          return action.payload;
        } else {
          return product;
        }
      });
      return {
        ...state,
        data,
        loaded: true,
        loading: false,
      };

      // return productAdapter.updateOne(action.payload, state);
    }

    case fromProductActions.UPDATE_PRODUCT_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case fromProductActions.ADD_PRODUCT_SUCCESS: {
      return {
        ...state,
        data: [...state.data, action.payload],
      };

      //  return productAdapter.addOne(action.payload, state);
    }

    case fromProductActions.ADD_PRODUCT_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case fromProductActions.DELETE_PRODUCT_SUCCESS: {
      const userId = action.payload;
      return {
        ...state,
        data: [...state.data.filter(user => user.id !== userId)],
      };
    }

    case fromProductActions.DELETE_PRODUCT_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const getProducts = (state: ProductState) => state.data;
export const getProductsLoaded = (state: ProductState) => state.loaded;
export const getProductsLoading = (state: ProductState) => state.loading;
export const getProductsError = (state: ProductState) => state.error;
