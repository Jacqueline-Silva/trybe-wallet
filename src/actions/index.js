// Coloque aqui suas actions
import {
  GET_CURRENCY,
  ATT_EXPENSES,
  REQUEST_FAILURE,
  REQUEST_REALIZED,
  SAVE_EMAIL,
  SAVE_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  SELECTED_EXPENSE,
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

export const attExpenses = (expensesAtt) => ({
  type: ATT_EXPENSES,
  expensesAtt,
});

export const editExpense = (bool) => ({
  type: EDIT_EXPENSE,
  bool,
});

export const selectExpense = (expense) => ({
  type: SELECTED_EXPENSE,
  expense,
});

export const removeExpense = (expense, listAtt) => ({
  type: REMOVE_EXPENSE,
  expense,
  listAtt,
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
