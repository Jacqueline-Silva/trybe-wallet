import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  totalExpenses(expenses) {
    const total = expenses.reduce((acc, expense) => {
      const subTotal = expense.value * expense.exchangeRates[expense.currency].ask;
      acc += subTotal;
      return acc;
    }, 0);
    return +(total).toFixed(2);
  }

  render() {
    const { email, expenses } = this.props;

    return (
      <header>
        <div data-testid="email-field">{ email }</div>
        <div>
          <div>
            Despesa total:
            <p data-testid="total-field" value="0">{ this.totalExpenses(expenses) }</p>
          </div>
          <div>
            Câmbio utilizado:
            <p data-testid="header-currency-field">BRL</p>
          </div>
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
