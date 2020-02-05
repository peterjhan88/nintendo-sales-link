import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-form';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.placeOrder = this.placeOrder.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.removeItemEntirely = this.removeItemEntirely.bind(this);
  }

  setView(name, params) {
    this.setState({
      view: {
        name: name,
        params: params
      }
    });
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

  addToCart(productObject) {
    const productToAdd = {
      productId: productObject.product_id
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
        this.setState(previousState => {
          var newCart = previousState.cart;
          newCart.push(jsonData);
          return { cart: newCart };
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  placeOrder(orderDetails) {
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
        this.setState({ cart: [] });
      })
      .catch(err => {
        console.error(err);
      });
  }

  removeItem(cartItemId) {
    fetch(`/api/cartItems/${cartItemId}`, { method: 'DELETE' })
      .then(response => {
        this.setState(previousState => {
          var newCart = previousState.cart;
          for (var index = 0; index < newCart.length; index++) {
            if (newCart[index].cart_item_id === cartItemId) {
              newCart.splice(index, 1);
            }
          }
          return { cart: newCart };
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  removeItemEntirely(productId) {
    const itemsToRemove = this.state.cart.filter(item => item.product_id === productId);
    for (var index = 0; index < itemsToRemove.length; index++) {
      this.removeItem(itemsToRemove[index].cart_item_id);
    }
  }

  componentDidMount() {
    this.getCartItems();
  }

  render() {
    // let renderingElement;
    // if (this.state.view.name === 'catalog') {
    //   renderingElement =
    // } else if (this.state.view.name === 'details') {
    //   renderingElement = (
    //     <ProductDetails
    //       params={this.state.view.params}
    //       setView={this.setView}
    //       addToCart={this.addToCart}
    //     />
    //   );
    // } else if (this.state.view.name === 'cart') {
    //   renderingElement = (
    //     <CartSummary
    //       cart={this.state.cart}
    //       setView={this.setView}
    //       removeItem={this.removeItem}
    //       addToCart={this.addToCart}
    //       removeItemEntirely={this.removeItemEntirely}
    //     />
    //   );
    // } else if (this.state.view.name === 'checkout') {
    //   renderingElement = (
    //     <CheckoutForm
    //       setView={this.setView}
    //       placeOrder={this.placeOrder}
    //       orderTotal={this.state.cart.length === 0 ? 0 : this.state.cart.reduce((acc, item) => acc + item.price, 0)}
    //       numberOfItemsInCart={this.state.cart.length}
    //     />
    //   );
    // }
    return (
      <Router>
        <Route path='/'>
          <Header
            cartItemCount={this.state.cart.length}
            setView={this.setView}
          />
        </Route>
        <Route exact={true} path='/'>
          <ProductList setView={this.setView} />
        </Route>
        <Route exact={true} path='/detail/:productId'>
          <ProductDetails
            params={this.state.view.params}
            setView={this.setView}
            addToCart={this.addToCart}
          />
        </Route>
        <Route exact={true} path='/cart'>
          <CartSummary
            cart={this.state.cart}
            setView={this.setView}
            removeItem={this.removeItem}
            addToCart={this.addToCart}
            removeItemEntirely={this.removeItemEntirely}
          />
        </Route>
        <Route exact={true} path='/checkout'>
          <CheckoutForm
            setView={this.setView}
            placeOrder={this.placeOrder}
            orderTotal={this.state.cart.length === 0 ? 0 : this.state.cart.reduce((acc, item) => acc + item.price, 0)}
            numberOfItemsInCart={this.state.cart.length}
          />
        </Route>
      </Router>
    );
  }
}
