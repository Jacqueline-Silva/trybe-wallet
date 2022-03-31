import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    const { email } = this.props;

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
      </div>
    );
  }
}

Wallet.propTypes = ({
  email: PropTypes.string.isRequired,
});

const mapStateToProps = (store) => ({
  email: store.user.email,
});

export default connect(mapStateToProps, null)(Wallet);
