import { SAVE_EMAIL } from '../actions/actionTypes';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_EMAIL:
    return {
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
