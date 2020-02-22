import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';
import WarningModal from './warning-modal';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      firstVisit: true
    };
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.removeItemEntirely = this.removeItemEntirely.bind(this);
    this.removeModalWithConsent = this.removeModalWithConsent.bind(this);
  }

  getCartItems() {
    fetch('/api/cart')
      .then(result => result.json())
      .then(jsonData => {
        this.setState({ cart: jsonData });
      })
      .catch(err => {
        console.error(err);
      });
  }

  addToCart(productAddedToCart) {
    this.setState(previousState => {
      var newCart = previousState.cart;
      newCart.push(productAddedToCart);
      return { cart: newCart };
    });
  }

  placeOrder() {
    this.setState({ cart: [] });
  }

  removeItem(cartItemId) {
    this.setState(previousState => {
      var newCart = previousState.cart;
      for (var index = 0; index < newCart.length; index++) {
        if (newCart[index].cart_item_id === cartItemId) {
          newCart.splice(index, 1);
        }
      }
      return { cart: newCart };
    });
  }

  removeItemEntirely(productId) {
    this.setState(previousState => {
      const itemsLeft = previousState.cart.filter(item => item.product_id !== productId);
      return { cart: itemsLeft };
    });
  }

  componentDidMount() {
    this.getCartItems();
  }

  removeModalWithConsent() {
    this.setState({ firstVisit: false });
  }

  render() {
    return (
      <Router>
        <Route path='/'>
          {
            this.state.firstVisit
              ? <WarningModal removeModalWithConsent={this.removeModalWithConsent} />
              : <></>
          }
          <Header
            cartItemCount={this.state.cart.length}
          />
        </Route>
        <Route exact={true} path='/'>
          <ProductList additionalClass={this.state.firstVisit ? ' prevent-scrolling' : ''}/>
        </Route>
        <Route exact={true} path='/detail/:productId'>
          <ProductDetails
            addToCart={this.addToCart}
          />
        </Route>
        <Route exact={true} path='/cart'>
          <CartSummary
            cart={this.state.cart}
            removeItem={this.removeItem}
            addToCart={this.addToCart}
            removeItemEntirely={this.removeItemEntirely}
          />
        </Route>
        <Route exact={true} path='/checkout'>
          <CheckoutForm
            placeOrder={this.placeOrder}
            orderTotal={this.state.cart.length === 0 ? 0 : this.state.cart.reduce((acc, item) => acc + item.price, 0)}
            numberOfItemsInCart={this.state.cart.length}
          />
        </Route>
      </Router>
    );
  }
}
