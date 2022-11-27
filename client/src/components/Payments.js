import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
  render() {
    //debugger;
    return (
      <StripeCheckout name="Emaily" description="$5 for 5 email credits" amount={500} token={token => this.props.handleToken(token)} stripeKey={process.env.REACT_APP_STRIPE_KEY} >

          <button className="btn">
              Add Credits
          </button>

      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);


// Tokin is expecting to receive a callback function and that callback function will be called after we have successfully retrieved a authorization token from the Stripe API.
// So remember how Stripe works after the user enters their credit card details? Those details are sent directly to Stripe by the form and then sends back a token representing the charge.