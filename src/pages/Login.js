import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveEmail } from '../actions';
import '../css/login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      pass: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleClick = () => {
    const { email } = this.state;
    const { savingEmail, history } = this.props;

    savingEmail(email);
    history.push('/carteira');
  };

  validate = () => {
    const { email, pass } = this.state;
    const regex = /\S+@\S+\.com/;
    const limitPassword = 6;

    if (!regex.test(email) || pass.length < limitPassword) {
      return true;
    }
  };

  render() {
    return (
      <div className="login">
        <div className="login-box">
          <h1> Login </h1>
          <label htmlFor="email-input" className="login-label">
            Email
            <input
              type="email"
              name="email"
              data-testid="email-input"
              onChange={ this.handleChange }
              className="login-input"
            />
          </label>
          <label htmlFor="password-input" className="login-label">
            Senha
            <input
              type="password"
              name="pass"
              data-testid="password-input"
              onChange={ this.handleChange }
              className="login-input"
            />
          </label>

          <button
            type="submit"
            disabled={ this.validate() }
            onClick={ this.handleClick }
            className="login-button"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = ({
  savingEmail: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.number),
}).isRequired;

const mapDispatchToProps = (dispatch) => ({
  savingEmail: (state) => dispatch(saveEmail(state)),
});

export default connect(null, mapDispatchToProps)(Login);

/**
 * REF:
 * https://www.w3schools.com/jsref/jsref_regexp_test.asp
 * https://gist.github.com/alexandreservian/124db2fab8a75474dd6fdc4f17f93a5d
 */
