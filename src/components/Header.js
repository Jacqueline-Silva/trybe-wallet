import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../css/header.css';

class Header extends React.Component {
  totalExpenses(expenses) {
    const total = expenses.reduce((acc, expense) => {
      const subTotal = expense.value * expense.exchangeRates[expense.currency].ask;
      acc += subTotal;
      return +(acc);
    }, 0);

    return total.toFixed(2);
  }

  render() {
    const { email, expenses } = this.props;

    return (
      <header className="header">
        <div className="header-email" data-testid="email-field">
          { email.length === 0 ? 'teste@teste.com' : email }
        </div>
        <div className="header-totalExpense">
          <p>Despesa total: </p>
          <span>
            R$
            <p data-testid="total-field">
              {
                expenses.length === 0
                  ? 0
                  : this.totalExpenses(expenses)
              }
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
});

const mapStateToProps = (store) => ({
  email: store.user.email,
  expenses: store.wallet.expenses,
});

export default connect(mapStateToProps, null)(Header);
