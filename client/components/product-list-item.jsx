import React from 'react';
import { withRouter } from 'react-router-dom';

class ProductListItem extends React.Component {
  render() {
    return (
      <div className='col-md-3 mx-3 my-3 pt-3 card card-list cursor-pointer'
        onClick={() => this.props.history.push(`/detail/${this.props.productId}`)}
      >
        <div className='image-container-list' >
          <img src={this.props.imgUrl} alt={this.props.name} className='image-contain' />
        </div>
        <div className='card-body card-body-list-item'>
          <div className='card-title'>{this.props.name}</div>
          <div className='card-text text-price text-weight-bold'>{`$ ${(this.props.price / 100).toFixed(2)}`}</div>
          <div className='card-text text-short-description'>{this.props.shortDescription}</div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProductListItem);
