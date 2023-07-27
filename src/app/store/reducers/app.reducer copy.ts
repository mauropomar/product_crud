import { Customer } from './../../models/customer.model';
import * as fromCustomerActions from '../actions/customer.action';

export interface CustomerState {
  data: Customer[];
  loaded: boolean;
  loading: boolean;
  error: string;
}

export const initialState: CustomerState = {
  data: [],
  loaded: false,
  loading: false,
  error: '',
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case fromCustomerActions.LOAD_CUSTOMERS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromCustomerActions.LOAD_CUSTOMERS_SUCCESS: {
      const data = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        data,
      };
    }

    case fromCustomerActions.LOAD_CUSTOMERS_FAIL: {
      const data = action.payload;
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload,
      };
    }

    case fromCustomerActions.UPDATE_CUSTOMER_SUCCESS: {
      let data = state.data.map((customer) => {
        if (customer.id === action.payload.id) {
          return action.payload;
        } else {
          return customer;
        }
      });
      return {
        ...state,
        data,
        loaded: true,
        loading: false,
      };

      // return customerAdapter.updateOne(action.payload, state);
    }

    case fromCustomerActions.UPDATE_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case fromCustomerActions.ADD_CUSTOMER_SUCCESS: {
      return {
        ...state,
        data: [...state.data, action.payload],
      };

      //  return customerAdapter.addOne(action.payload, state);
    }

    case fromCustomerActions.ADD_CUSTOMER_FAIL: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case fromCustomerActions.DELETE_CUSTOMER_SUCCESS: {
      const userId = action.payload;
      return {
        ...state,
        data: [...state.data.filter(user => user.id !== userId)],
      };
    }

    case fromCustomerActions.DELETE_CUSTOMER_FAIL: {
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

export const getCustomers = (state: CustomerState) => state.data;
export const getCustomersLoaded = (state: CustomerState) => state.loaded;
export const getCustomersLoading = (state: CustomerState) => state.loading;
export const getCustomersError = (state: CustomerState) => state.error;
