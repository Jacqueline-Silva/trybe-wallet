// Coloque aqui suas actions
import { SAVE_EMAIL } from './actionTypes';

const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export default saveEmail;
