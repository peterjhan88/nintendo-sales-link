import React from 'react';
import CartSummaryItem from './cart-summary-item';
import BackButton from './back-button';
import { withRouter } from 'react-router-dom';

class CartSummary extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickPlaceOrder = this.handleClickPlaceOrder.bind(this);
    this.handleClickAddToCart = this.handleClickAddToCart.bind(this);
    this.handleClickRemoveItem = this.handleClickRemoveItem.bind(this);
    this.handleClickRemoveItemEntirely = this.handleClickRemoveItemEntirely.bind(this);
  }

  calculateTotal() {
    return this.props.cart.length === 0 ? 0 : this.props.cart.reduce((acc, item) => acc + item.price, 0);
  }

  calculateSubTotal(productId) {
    const singleKind = this.props.cart.filter(product => product.product_id === productId);
    return singleKind.reduce((acc, item) => acc + item.price, 0);
  }

  getUniqueProduct(cart) {
    if (cart.length === 0) {
      return [];
    }
    const lastIndex = cart.length - 1;
    var uniqueProduct = [];
    var uniqueProductProductIds = [];
    uniqueProduct.push(this.props.cart[lastIndex]);
    uniqueProductProductIds.push(this.props.cart[lastIndex].product_id);
    for (var index = lastIndex - 1; index >= 0; index--) {
      var item = this.props.cart[index];
      item.qty = 1;
      if (!uniqueProductProductIds.includes(item.product_id)) {
        uniqueProductProductIds.push(item.product_id);
        uniqueProduct.push(item);
      }

    }
    return uniqueProduct;
  }

  getQuantity(productId) {
    var counter = 0;
    var cart = this.props.cart;
    for (var index = 0; index < cart.length; index++) {
      if (cart[index].product_id === productId) {
        counter++;
      }
    }
    return counter;
  }

  handleClickPlaceOrder() {
    const cart = this.props.cart;
    if (cart.length === 0) {
      // eslint-disable-next-line no-console
      console.log('you are trying to place order without an item to buy!');
      return false;
    }
    this.props.history.push('/checkout');
  }

  handleClickAddToCart(productId) {
    const productToAdd = {
      productId: productId
    };
    const headersToAdd = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productToAdd)
    };
    fetch('/api/cart', headersToAdd)
      .then(response => response.json())
      .then(jsonData => {
        this.props.addToCart(jsonData);
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleClickRemoveItem(productId) {
    const cart = this.props.cart;
    for (var index = 0; index < cart.length; index++) {
      if (cart[index].product_id === productId) {
        var cartItemId = cart[index].cart_item_id;
        break;
      }
    }
    fetch(`/api/cartItems/${cartItemId}`, { method: 'DELETE' })
      .then(response => {
        this.props.removeItem(cartItemId);
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleClickRemoveItemEntirely(productId) {
    fetch(`/api/cartItems/removeEntirely/${productId}`, { method: 'DELETE' })
      .then(response => {
        this.props.removeItemEntirely(productId);
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    var uniqueProduct = this.getUniqueProduct(this.props.cart);
    const cartItems = uniqueProduct.map(item => {
      return (
        <CartSummaryItem
          key={item.cart_item_id}
          item={item}
          removeItem={this.handleClickRemoveItem}
          addToCart={this.handleClickAddToCart}
          removeItemEntirely={this.handleClickRemoveItemEntirely}
          qty={this.getQuantity(item.product_id)}
        />
      );
    });

    return (
      <div className='cart-items-container display-background col-12 col-lg-12'>
        <BackButton />
        <div className='cart-title px-3 col-12 col-lg-12'>My Cart</div>
        {
          cartItems.length === 0
            ? <div className='empty-cart col-12 col-lg-9'>No Item to Display</div>
            : <div className='col-12 col-lg-9 d-flex justify-content-center flex-wrap'>{cartItems}</div>
        }
        <div className='col-12 col-lg-3 pb-5 grand-total-container'>
          <div className='col-12 my-4 cart-total-price d-flex'>Grand Total: ${(this.calculateTotal() / 100).toFixed(2)}</div>
          <button className='col-12 col-lg-8 btn btn-info button-height' onClick={this.handleClickPlaceOrder}>Place Order</button>
        </div>
      </div>
    );
  }
}

export default withRouter(CartSummary);
