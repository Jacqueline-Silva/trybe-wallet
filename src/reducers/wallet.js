import {
  GET_CURRENCY,
  ATT_EXPENSES,
  SAVE_EXPENSE,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  SELECTED_EXPENSE,
} from '../actions/actionTypes';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  removed: [],
  editExpense: false,
  expenseSelected: [],
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
      // expenses: [...state.expenses, action.expensesAtt],
      expenses: state.expenses.map((e) => {
        if (e.id === action.expensesAtt.id) return action.expensesAtt;
        return state.expenses;
      }),
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      removed: action.expense,
      expenses: action.listAtt,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      editExpense: action.bool,
    };
  case SELECTED_EXPENSE:
    return {
      ...state,
      expenseSelected: action.expense,
    };
  default:
    return state;
  }
};

export default wallet;
