import React from 'react';
import { withRouter } from 'react-router-dom';
import BackButton from './back-button';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: '',
      nameFocusedBefore: false,
      creditCardFocusedBefore: false,
      shippingAddressFocusedBefore: false
    };
    this.handlePlaceOrder = this.handlePlaceOrder.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkFocused = this.checkFocused.bind(this);
    this.handleChangeCreditCard = this.handleChangeCreditCard.bind(this);
  }

  handlePlaceOrder(event) {
    event.preventDefault();
    if (!this.goodToSubmit()) {
      return false;
    }
    var orderDetails = {};
    orderDetails.name = this.state.name;
    orderDetails.creditCard = this.state.creditCard.replace(/-/g, '');
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
  }

  handleChange(event) {
    const selectedInput = event.target.id;
    const currentValue = event.target.value;
    const newState = {};
    newState[selectedInput] = currentValue;
    this.setState(newState);
  }

  handleChangeCreditCard(event) {
    const maxCreditCardDigits = 16;
    let creditCard = event.target.value;
    if (creditCard === '') {
      this.setState({ creditCard: creditCard });
      return;
    }
    creditCard = creditCard.match(/\d/g);
    let formatted = '';
    if (creditCard !== null) {
      for (var index = 0; index < creditCard.length && index < maxCreditCardDigits; index++) {
        if (index !== 0 && index % 4 === 0) {
          formatted += '-';
        }
        formatted += creditCard[index];
      }
    }
    this.setState({ creditCard: formatted });
  }

  validateInputs(value) {
    if (value === '' || value.match(/^\s*$/g)) {
      return false;
    }
    return true;
  }

  validateCreditCard(creditCard) {
    if (!creditCard) {
      return false;
    }
    if (creditCard.match(/\d/g).length === 16) {
      return true;
    }
    return false;
  }

  goodToSubmit() {
    return (
      this.validateInputs(this.state.name) &&
      this.validateInputs(this.state.shippingAddress) &&
      this.validateCreditCard(this.state.creditCard) &&
      this.props.numberOfItemsInCart !== 0
    );
  }

  checkFocused(inputId) {
    const key = inputId + 'FocusedBefore';
    const newState = {};
    newState[key] = true;
    this.setState(newState);
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
                className={!this.state.nameFocusedBefore || this.validateInputs(this.state.name) ? 'col-12 order-input' : 'col-12 order-input invalid-input'}
                id='name'
                placeholder='First Last'
                value={this.state.name}
                onChange={this.handleChange}
                onBlur={() => { this.checkFocused(event.target.id); }}
              />
              {
                !this.state.nameFocusedBefore || this.validateInputs(this.state.name)
                  ? <div className='px-3 example-comment'>{!this.state.nameFocusedBefore ? 'Example: John Doe' : ''}</div>
                  : <div className='px-3 invalid-input-comment'>Plz provide name</div>
              }
            </div>
            <div className='form-group col-12'>
              <label className='col-12 input-title'>Credit Card Number</label>
              <input
                type='text'
                className={!this.state.creditCardFocusedBefore || this.validateInputs(this.state.creditCard) ? 'col-12 order-input' : 'col-12 order-input invalid-input'}
                id='creditCard'
                placeholder='Credit Card Number'
                value={this.state.creditCard}
                onChange={this.handleChangeCreditCard}
                onBlur={() => { this.checkFocused(event.target.id); }}
              />
              {
                !this.state.creditCardFocusedBefore || this.validateCreditCard(this.state.creditCard)
                  ? <div className='px-3 example-comment'>{!this.state.nameFocusedBefore ? 'Example: 234567890123456' : ''}</div>
                  : <div className='px-3 invalid-input-comment'>Plz provide valid information</div>
              }
            </div>
            <div className='form-group col-12 address-height-fix '>
              <label className='col-12 input-title'>Shipping Address</label>
              <textarea
                type='text'
                className={!this.state.shippingAddressFocusedBefore || this.validateInputs(this.state.shippingAddress) ? 'col-12 order-textarea-address' : 'col-12 order-textarea-address invalid-input'}
                id='shippingAddress'
                value={this.state.shippingAddress}
                onChange={this.handleChange}
                onBlur={() => { this.checkFocused(event.target.id); }}
                rows='4'
              >
              </textarea>
              {
                !this.state.shippingAddressFocusedBefore || this.validateInputs(this.state.shippingAddress)
                  ? <div className='px-3 example-comment'>{!this.state.shippingAddressFocusedBefore ? 'Example: 123 Street, Los Angeles, CA' : ''}</div>
                  : <div className='px-3 invalid-input-comment'>Plz provide valid information</div>
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
