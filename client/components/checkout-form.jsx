import React from 'react';
import { withRouter } from 'react-router-dom';
import BackButton from './back-button';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handlePlaceOrder(event) {
    event.preventDefault();
    if (!this.goodToSubmit()) {
      // eslint-disable-next-line no-console
      console.log('Invalid Inputs! Either input values are invalid or no items in the cart!');
      return false;
    }
    var orderDetails = {};
    orderDetails.name = this.state.name;
    orderDetails.creditCard = this.state.creditCard.replace(' ', '');
    orderDetails.shippingAddress = this.state.shippingAddress;
    const headersToOrder = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderDetails)
    };
    fetch('/api/orders', headersToOrder)
      .then(response => response.json())
      .then(jsonData => {
        this.setState({
          name: '',
          creditCard: '',
          shippingAddress: ''
        });
        this.props.placeOrder();
        this.props.history.push('/');
      })
      .catch(err => {
        console.error(err);
      });
    return true;
  }

  handleChange(event) {
    const selectedInput = event.target.getAttribute('id');
    const currentValue = event.target.value;
    const newState = {};
    newState[selectedInput] = currentValue;
    this.setState(newState);
  }

  validateInputs(value) {
    if (value === '' || value.match(/^\s*$/g)) {
      return false;
    }
    return true;
  }

  validateCreditCard(creditCard) {
    if (!creditCard || creditCard.match(/[^\s|^\d]/g)) {
      return false;
    }
    return creditCard.match(/\d/g).join('').length === 16;
  }

  goodToSubmit() {
    return (
      this.validateInputs(this.state.name) &&
      this.validateInputs(this.state.shippingAddress) &&
      this.validateCreditCard(this.state.creditCard) &&
      this.props.numberOfItemsInCart !== 0
    );
  }

  render() {
    return (
      <div className='checkout-container col-12 col-lg-12 mx-auto display-background'>
        <BackButton />
        <div className="col-12 col-lg-12">
          <form className='checkout-form col-12 col-lg-8 mx-auto'>
            <div className='col-12 col-lg-12 cart-title'>Order Detail</div>
            <div className='order-total-price col-12 col-lg-12 mb-3 d-flex'>
                Order Total: ${(this.props.orderTotal / 100).toFixed(2)}
            </div>
            <div className='form-group col-12'>
              <label className='col-12 input-title text-weight-bold'>Name</label>
              <input
                type='text'
                className={this.validateInputs(this.state.name) ? 'col-12 order-input valid-input' : 'col-12 order-input invalid-input'}
                id='name'
                value={this.state.name}
                onChange={this.handleChange}
              />
              {
                this.validateInputs(this.state.name)
                  ? <div className='valid-input-comment'>Name is provided.</div>
                  : <div className='invalid-input-comment'>Name is not provided. Please enter name.</div>
              }
            </div>
            <div className='form-group col-12'>
              <label className='col-12 input-title'>Credit Card Number</label>
              <input
                type='text'
                className={this.validateCreditCard(this.state.creditCard) ? 'col-12 order-input valid-input' : 'col-12 order-input invalid-input'}
                id='creditCard'
                value={this.state.creditCard}
                onChange={this.handleChange}
              />
              {
                this.validateCreditCard(this.state.creditCard)
                  ? <div className='valid-input-comment'>Valid credit card number</div>
                  : <div className='invalid-input-comment'>Invalid number</div>
              }
            </div>
            <div className='form-group col-12'>
              <label className='col-12 input-title'>Shipping Address</label>
              <textarea
                type='text'
                className={this.validateInputs(this.state.shippingAddress) ? 'col-12 order-textarea-address valid-input' : 'col-12 order-textarea-address invalid-input'}
                id='shippingAddress'
                value={this.state.shippingAddress}
                onChange={this.handleChange}
                rows='4'
              >
              </textarea>
              {
                this.validateInputs(this.state.shippingAddress)
                  ? <div className='valid-input-comment'>Address is provided.</div>
                  : <div className='invalid-input-comment'>Address is not provided. Please enter address.</div>
              }
            </div>
          </form>
          <div className='col-12 col-lg-8 mx-auto py-3 d-flex'>
            <button className='btn btn-info place-order-button' onClick={this.handlePlaceOrder}>Place Order</button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CheckoutForm);
