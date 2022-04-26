import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeExpense, editExpense, selectExpense } from '../actions';
import '../css/table.css';

class Table extends Component {
  removeExpense = ({ target }) => {
    const { expenses, removedExpense } = this.props;
    const { name } = target;

    const listExpensesAtt = expenses.filter((e) => e.id !== +(name));
    const expenseSelected = expenses.filter((e) => e.id === +(name));

    removedExpense(expenseSelected, listExpensesAtt);
  }

  attExpense = (expense) => {
    const { btnEditExpense, savingEdit } = this.props;

    savingEdit(expense);
    btnEditExpense(true);
  }

  transform(expense) {
    const { currency, exchangeRates } = expense;
    const askValue = +(exchangeRates[currency].ask);
    return askValue;
  }

  render() {
    const { expenses } = this.props;

    return (
      <div className="table-div">
        <table>
          <caption>
            <h2> Tabela de Gastos </h2>
          </caption>
          <tbody>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
            {
              expenses
                .map((expense) => (
                  <tr key={ expense.id }>
                    <td>{ expense.description }</td>
                    <td>{ expense.tag }</td>
                    <td>{ expense.method }</td>
                    <td>
                      {
                        expense.value.length === 2
                          ? `${expense.value}.00`
                          : expense.value
                      }
                    </td>
                    <td>
                      { expense.exchangeRates[expense.currency].name.split('/')[0]}
                    </td>
                    <td>{ this.transform(expense).toFixed(2) }</td>
                    <td>{ (expense.value * this.transform(expense)).toFixed(2) }</td>
                    <td>Real</td>
                    <td>
                      <button
                        type="button"
                        name={ expense.id }
                        data-testid="edit-btn"
                        onClick={ () => this.attExpense(expense) }
                      >
                        Editar
                      </button>
                      <button
                        type="reset"
                        name={ expense.id }
                        data-testid="delete-btn"
                        onClick={ this.removeExpense }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  removedExpense: PropTypes.func,
}.isRequired;

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
  expensesAtt: store.wallet.listExpensesAtt,
  editExpenseBool: store.wallet.editExpense,
});

const mapDispatchToProps = (dispatch) => ({
  removedExpense: (state, list) => dispatch(removeExpense(state, list)),
  btnEditExpense: (state) => dispatch(editExpense(state)),
  savingEdit: (state) => dispatch(selectExpense(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);

/**
 * REF:
 * https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/table
 */
