import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { objectCurrencies, editExpense, selectExpense, attExpenses } from '../actions';
import '../css/formExpense.css';

class FormExpense extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      description: '',
      currency: '',
      method: '',
      tag: '',
      id: 0,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleClick = ({ target }) => {
    const { name } = target;
    const {
      savingExpense,
      btnEditExpense,
      expenseSelected,
      savingEdit,
      savingExpensesEdit } = this.props;

    if (name === 'add') {
      savingExpense({ ...this.state });

      this.setState((prev) => ({
        value: 0,
        description: '',
        id: prev.id + 1,
      }));
    }
    if (name === 'edit') {
      const { value, description, method, tag } = this.state;

      savingEdit({ ...expenseSelected, value, description, tag, method });
      btnEditExpense(false);

      savingExpensesEdit({
        ...expenseSelected,
        value,
        description,
        tag,
        method,
      });
    }
  };

  render() {
    const { value, description, method, tag, currency } = this.state;
    const { currencies, editExpenseBool } = this.props;

    return (
      <div>
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
            <select
              id="moeda"
              name="currency"
              onChange={ this.handleChange }
              value={ currency }
            >
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
              value={ method }
              onChange={ this.handleChange }
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria
            <select
              id="tag-input"
              data-testid="tag-input"
              name="tag"
              onChange={ this.handleChange }
              value={ tag }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <button
            type="button"
            name={ editExpenseBool ? 'edit' : 'add' }
            onClick={ this.handleClick }
            data-testid="currency-input"
          >
            { editExpenseBool ? 'Editar despesa' : 'Adicionar despesa' }
          </button>
        </form>
      </div>
    );
  }
}

FormExpense.propTypes = ({
  currencies: PropTypes.arrayOf(PropTypes.string),
  savingExpense: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object),
  method: PropTypes.string,
  tag: PropTypes.string,
  currency: PropTypes.string,
}.isRequired);

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
  expenses: store.wallet.expenses,
  editExpenseBool: store.wallet.editExpense,
  expenseSelected: store.wallet.expenseSelected,
});

const mapDispatchToProps = (dispatch) => ({
  savingExpense: (state) => dispatch(objectCurrencies(state)),
  btnEditExpense: (state) => dispatch(editExpense(state)),
  savingEdit: (state) => dispatch(selectExpense(state)),
  savingExpensesEdit: (state) => dispatch(attExpenses(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormExpense);
