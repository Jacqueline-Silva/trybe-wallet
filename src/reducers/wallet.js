import {
  GET_CURRENCY,
  ATT_EXPENSES,
  SAVE_EXPENSE,
  REMOVE_EXPENSE,
} from '../actions/actionTypes';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  removed: [],
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
  case ATT_EXPENSES:
    return {
      ...state,
      expenses: action.expenses,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      removed: action.expense,
      expenses: action.listAtt,
    };
  default:
    return state;
  }
};

export default wallet;
