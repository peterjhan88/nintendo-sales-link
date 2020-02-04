import React from 'react';
import CartSummaryItem from './cart-summary-item';

export default class CartSummary extends React.Component {
  calculateTotal() {
    return this.props.cart.length === 0 ? 0 : this.props.cart.reduce((acc, item) => acc + item.price, 0);
  }

  calculateSubTotal(
  
  
  
  
  
 Id) {
    const singleKind = this.props.cart.filter(product => product.product_id === productId);
    return singleKind.reduce((acc, item) => acc + item.price, 0);
  }

  getUniqueProduct(cart) {
    if (cart.length === 0) {
      return [];
    }
    var uniqueProduct = [];
    var uniqueProductProductIds = [];
    uniqueProduct.push(this.props.cart[0]);
    uniqueProductProductIds.push(this.props.cart[0].product_id);
    for (var index = 1; index < this.props.cart.length; index++) {
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

  render() {
    var uniqueProduct = this.getUniqueProduct(this.props.cart);
    const cartItems = uniqueProduct.map(item => {
      return (
        <CartSummaryItem
          key={item.cart_item_id}
          item={item}
          removeItem={this.props.removeItem}
          addToCart={this.props.addToCart}
          removeItemEntirely={this.props.removeItemEntirely}
          qty={this.getQuantity(item.product_id)}
        />
      );
    });

    return (
      <div className='cart-items-container col-11 mx-auto'>
        <div className='col-12 back-to-catalog my-3' onClick={() => this.props.setView('catalog', {})}>
          <i className='fas fa-chevron-left'></i>{' Back to catalog'}
        </div>
        <div className='col-12 cart-title'>My Cart</div>
        {
          cartItems.length === 0
            ? <div className='empty-cart'>No Item to Display</div>
            : <div className='d-flex justify-content-center flex-wrap'>{cartItems}</div>
        }
        <div className='row col-10 d-flex align-items-center'>
          <div className='cart-total-price col-10 my-5 d-flex'>Grand Total: ${(this.calculateTotal() / 100).toFixed(2)}</div>
          <button className='btn btn-info button-height col-2' onClick={() => this.props.setView('checkout', {})}>Place Order</button>
        </div>
      </div>
    );
  }
}