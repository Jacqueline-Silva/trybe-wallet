import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/header.css';

class Header extends React.Component {
  totalExpenses(expenses, removedExpense) {
    if (removedExpense !== undefined) {
      const total = expenses.reduce((acc, expense) => {
        const subTotal = expense.value * expense.exchangeRates[expense.currency].ask;
        acc += subTotal;
        return +(acc);
      }, 0);

      const teste = removedExpense.map((e) => {
        const sub = e.value * e.exchangeRates[e.currency].ask;
        return +(sub);
      });

      if (removedExpense.length === 0) {
        return total.toFixed(2);
      }

      if (expenses.length === 0) {
        return 0;
      }

      return (total - teste).toFixed(2);
    }
  }

  render() {
    const { email, expenses, removedExpense } = this.props;

    return (
      <header className="header">
        <div className="header-email" data-testid="email-field">
          { email.length === 0 ? 'teste@teste.com' : email }
        </div>
        <div className="header-totalExpense">
          <p>Despesa total: </p>
          <span>
            R$
            <p data-testid="total-field" value="0">
              { this.totalExpenses(expenses, removedExpense) }
            </p>
          </span>
          <p data-testid="header-currency-field">BRL</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = ({
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removedExpense: PropTypes.arrayOf(PropTypes.object).isRequired,
});

const mapStateToProps = (store) => ({
  email: store.user.email,
  expenses: store.wallet.expenses,
  removedExpense: store.wallet.removed,
});

export default connect(mapStateToProps, null)(Header);
