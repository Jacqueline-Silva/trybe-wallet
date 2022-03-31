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
          </div>
        </header>

        <form>
          <label htmlFor="value-input">
            Valor da despesa
            <input type="text" data-testid="value-input" />
          </label>
          <label htmlFor="description-input">
            Descrição da despesa
            <input type="text" data-testid="description-input" />
          </label>
          <label htmlFor="moeda">
            Moeda
            <select id="moeda">
              {
                currencies.map((coin) => (
                  <option key={ coin }>{ coin }</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method-input">
            Método de pagamento
            <select data-testid="method-input">
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria
            <select data-testid="tag-input">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
        </form>
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
