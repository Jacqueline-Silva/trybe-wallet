import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import FormExpense from '../components/FormExpense';
import { requestCurrencies } from '../actions';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      expenseSelected: [],
    };
  }

  componentDidMount() {
    const { initialRequest } = this.props;
    initialRequest();
  }

  getExpenseSelected = (expense) => {
    this.setState({
      expenseSelected: expense,
    });
  }

  render() {
    const { expenseSelected } = this.state;
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          <FormExpense state={ expenseSelected } />
        </div>
        <div>
          <Table getExpense={ this.getExpenseSelected } />
        </div>
      </div>
    );
  }
}

Wallet.propTypes = ({
  initialRequest: PropTypes.func,
}).isRequired;

const mapDispatchToProps = (dispatch) => ({
  initialRequest: () => dispatch(requestCurrencies()),
});

export default connect(null, mapDispatchToProps)(Wallet);
