import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { objectCurrencies } from '../actions';

class FormExpense extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleClick = () => {
    const { savingExpense, expenses } = this.props;
    savingExpense({ ...this.state, id: expenses.length });

    this.setState({
      value: 0,
      description: '',
    });
  };

  render() {
    const { value, description } = this.state;
    const { currencies } = this.props;

    return (
      <form>
        <label htmlFor="value-input">
          Valor da despesa
          <input
            type="number"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description-input">
          Descrição da despesa
          <input
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="moeda">
          Moeda
          <select id="moeda" name="currency" onChange={ this.handleChange }>
            {
              currencies.map((coin) => (
                <option key={ coin }>{ coin }</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method-input">
          Método de pagamento
          <select
            id="method-input"
            data-testid="method-input"
            name="method"
            onChange={ this.handleChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag-input">
          Categoria
          <select
            id="tag-input"
            data-testid="tag-input"
            name="tag"
            onChange={ this.handleChange }
          >
            <option selected>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

FormExpense.propTypes = ({
  currencies: PropTypes.arrayOf.isRequired,
  savingExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
});

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
  expenses: store.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  savingExpense: (state) => dispatch(objectCurrencies(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormExpense);
