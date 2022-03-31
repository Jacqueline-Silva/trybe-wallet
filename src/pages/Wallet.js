import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { requestCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { initialRequest } = this.props;
    initialRequest();
  }

  render() {
    const { email, currencies } = this.props;

    return (
      <div>
        <header>
          <div data-testid="email-field">{ email }</div>
          <div>
            <div>
              Despesa total:
              <p data-testid="total-field">0</p>
            </div>
            <div>
              Câmbio utilizado:
              <p data-testid="header-currency-field">BRL</p>
            </div>
            <select>
              {
                currencies.map((coin) => (
                  <option key={ coin }>{ coin }</option>
                ))
              }
            </select>
          </div>

        </header>
      </div>
    );
  }
}

Wallet.propTypes = ({
  email: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  initialRequest: PropTypes.func.isRequired,
});

const mapStateToProps = (store) => ({
  email: store.user.email,
  currencies: store.wallet.currencies,
});

const mapDispatchToProps = (dispatch) => ({
  initialRequest: () => dispatch(requestCurrencies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
