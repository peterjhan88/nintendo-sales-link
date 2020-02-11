import React from 'react';
import ProductListItem from './product-list-item';
import { withRouter } from 'react-router-dom';

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  getProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(jsonData => {
        this.setState({ products: jsonData });
      })
      .catch(error => console.error(error));
  }

  componentDidMount() {
    this.getProducts();
  }

  render() {
    const allProducts = this.state.products.map(product => {
      return (
        <ProductListItem
          key={product.product_id}
          productId={product.product_id}
          imgUrl={product.image}
          name={product.name}
          price={product.price}
          shortDescription={product.short_description}
        />
      );
    });
    return (
      <div className={`product-list display-background py-3 bg-light${this.props.additionalClass}`}>
        {allProducts}
      </div>
    );
  }
}

export default withRouter(ProductList);
