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

    return !this.state.product ? <div className='display-background'>loading...</div>
      : (
        <div className='display-background product-detail-container px-3'>
          <BackButton />
          <div className='product-detail-card card col-12 col-lg-8 mx-auto my-3 pt-3'>
            <div className='row d-flex align-items-center justify-content-around'>
              <img
                src={this.state.product.image}
                alt={this.state.product.name}
                className='image-detail col-lg-6 col-12'
              />
              <div className='col-12 col-lg-6'>
                <h3>{this.state.product.name}</h3>
                <div className='text-price text-weight-bold'>{`$ ${(this.state.product.price / 100).toFixed(2)}`}</div>
                <div className='text-short-description mb-3'>{this.state.product.short_description}</div>
                <div className="btn btn-info border border-dark" onClick={this.addToCart}>Add to Cart</div>
              </div>
            </div>
            <div className='px-3 my-3'>{this.state.product.long_description}</div>
          </div>
        </div>
      );
  }
}
export default withRouter(ProductDetails);
