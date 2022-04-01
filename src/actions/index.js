// Coloque aqui suas actions
import {
  GET_CURRENCY,
  REQUEST_FAILURE,
  REQUEST_REALIZED,
  SAVE_EMAIL,
  SAVE_EXPENSE,
} from './actionTypes';

const requestRealized = () => ({ type: REQUEST_REALIZED });
const requestFailure = () => ({ type: REQUEST_FAILURE });

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const saveExpense = (state) => ({
  type: SAVE_EXPENSE,
  expense: state,
});

export const getCurrency = (data) => ({
  type: GET_CURRENCY,
  currencies: Object.keys(data).filter((coins) => coins !== 'USDT'),
});

export function requestCurrencies() {
  return (dispatch) => {
    dispatch(requestRealized());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => dispatch(getCurrency(data)))
      .catch(() => dispatch(requestFailure()));
  };
}

export function objectCurrencies(state) {
  return (dispatch) => {
    dispatch(requestRealized());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => dispatch(saveExpense({ ...state, exchangeRates: data })))
      .catch(() => dispatch(requestFailure()));
  };
}
