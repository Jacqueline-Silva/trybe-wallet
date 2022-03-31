// Coloque aqui suas actions
import { GET_CURRENCY, REQUEST_REALIZED, SAVE_EMAIL } from './actionTypes';

const requestRealized = () => ({ type: REQUEST_REALIZED });

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
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
      .then((data) => dispatch(getCurrency(data)));
  };
}
