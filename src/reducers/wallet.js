import { GET_CURRENCY, SAVE_EXPENSE } from '../actions/actionTypes';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  ask: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCY:
    return {
      ...state,
      currencies: [...action.currencies],
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  default:
    return state;
  }
};

export default wallet;
