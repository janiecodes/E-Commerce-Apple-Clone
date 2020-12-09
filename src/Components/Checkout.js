import {Link} from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios'
import React, { Component } from 'react';


class Checkout extends Component {
    constructor(props){
        super(props);
    
      }

   onToken = (token) => {
        console.log(token);
        console.log(this.props.cartTotal)
        token.card = void 0;
        axios.post('/api/checkout', { token, price: (this.props.cartTotal)})
        .then(response => {
          alert('Transaction Successful')
        }).catch( (err)=> console.log(err))
      }

    render() {
    return (
        <div className='checkout-component'>
            <header>
                <h3>Checkout</h3>
                <p>Show Order Summary: {this.props.cartTotal}</p>
                
            </header>
            
            <div className="stripeCheckout">
                  <StripeCheckout
                    description={ "Apple Clone Demonstration" }
                    token={this.onToken}
                    stripeKey={ process.env.REACT_APP_PUB_KEY}
                    amount={(this.props.cartTotal)}
                  />
            </div>
            <Link to="/cart/me"><p className="continueShopping">Review Bag</p></Link>


            
        </div>
    )
    }
}
export default Checkout;
