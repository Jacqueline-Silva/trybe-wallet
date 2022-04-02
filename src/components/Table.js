import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  transform(expense) {
    const { currency, exchangeRates } = expense;
    const askValue = +(exchangeRates[currency].ask);
    return askValue;
  }

  render() {
    const { expenses } = this.props;
    console.log(expenses);

    return (
      <div>
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
              expenses.map((expense) => (
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
                  <td>{ expense.exchangeRates[expense.currency].name.split('/')[0]}</td>
                  <td>{ this.transform(expense).toFixed(2) }</td>
                  <td>{ (expense.value * this.transform(expense)).toFixed(2) }</td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      name={ expense.id }
                      data-testid="edit-btn"
                    >
                      Editar despesa
                    </button>
                    <button
                      type="reset"
                      name={ expense.id }
                      data-testid="delete-btn"
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
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (store) => ({
  expenses: store.wallet.expenses,
});

export default connect(mapStateToProps, null)(Table);

/**
 * REF:
 * https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/table
 */
