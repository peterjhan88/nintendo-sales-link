import React from 'react';
import { withRouter } from 'react-router-dom';
import BackButton from './back-button';

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
    this.addToCart = this.addToCart.bind(this);
  }

  addToCart() {
    const productToAdd = {
      productId: this.props.match.params.productId
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

  componentDidMount() {
    fetch(`/api/products/${this.props.match.params.productId}`)
      .then(response => response.json())
      .then(jsonData => {
        this.setState({ product: jsonData });
      })
      .catch(error => console.error(error));
  }

  render() {

    return !this.state.product ? <div>loading...</div>
      : (
        <div className='d-flex align-items-center justify-content-center flex-wrap card col-11 mx-5 my-3 py-3 bg-light'>
          <div className='row d-flex align-items-center justify-content-around'>
            <BackButton />
            <img src={this.state.product.image} alt={this.state.product.name} className='image-detail'/>
            <div className='col-4'>
              <h3>{this.state.product.name}</h3>
              <div className='text-price text-weight-bold'>{`$ ${(this.state.product.price / 100).toFixed(2)}`}</div>
              <div className='text-short-description'>{this.state.product.short_description}</div>
              <div className="btn btn-light border border-dark" onClick={this.addToCart}>Add to Cart</div>
            </div>
          </div>
          <div className='col-11 my-3'>{this.state.product.long_description}</div>
        </div>
      );
  }
}
export default withRouter(ProductDetails);
