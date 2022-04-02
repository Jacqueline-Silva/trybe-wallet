import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import FormExpense from '../components/FormExpense';
import { requestCurrencies } from '../actions';
import TableHeader from '../components/TableHeader';

class Wallet extends React.Component {
  componentDidMount() {
    const { initialRequest } = this.props;
    initialRequest();
  }

  render() {
    return (
      <div>
        <div>
          <Header />
        </div>
        <div>
          <FormExpense />
        </div>
        <div>
          <TableHeader />
        </div>
      </div>
    );
  }
}

Wallet.propTypes = ({
  initialRequest: PropTypes.func.isRequired,
});

const mapDispatchToProps = (dispatch) => ({
  initialRequest: () => dispatch(requestCurrencies()),
});

export default connect(null, mapDispatchToProps)(Wallet);
