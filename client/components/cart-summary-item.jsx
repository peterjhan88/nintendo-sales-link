import React from 'react';

export default class CartSummaryItem extends React.Component {
  render() {
    return (
      <div className='col-10 my-3 mx-3 py-3 d-flex align-items-center justify-content-center card row card-cart'>
        <div className='image-container-cart col-5'>
          <img src={this.props.item.image} alt={this.props.item.name} className='image-contain'/>
        </div>
        <div className='card-body d-flex flex-column card-body-cart col-5'>
          <h3 className='cart-product-name'>{this.props.item.name}</h3>
          <div className='cart-product-price'>{`$ ${(this.props.item.price / 100).toFixed(2)}`}</div>
          <div className='mt-2 mb-auto cart-product-short-description'>{this.props.item.shortDescription}</div>
          <button className='btn btn-warning' onClick={() => { this.props.removeItemEntirely(this.props.item.productId); }}>Remove Item Entirely</button>
        </div>
        <div className='col-6'>
          <div>Quantity : {this.props.qty}</div>
          <div>Sub Total: $ {(this.props.item.price * this.props.qty / 100).toFixed(2)}</div>
        </div>
      </div>
    );
  }
}
