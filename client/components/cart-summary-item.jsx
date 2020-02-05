import React from 'react';
import { withRouter } from 'react-router-dom';

class CartSummaryItem extends React.Component {

  render() {
    return (
      <div className='my-3 py-3 card card-cart'>
        <div className='image-container-cart col-5'>
          <img src={this.props.item.image} alt={this.props.item.name} className='image-contain'/>
        </div>
        <div className='card-body d-flex flex-column card-body-cart col-4'>
          <h3 className='cart-product-name'>{this.props.item.name}</h3>
          <div className='cart-product-price'>{`$ ${(this.props.item.price / 100).toFixed(2)}`}</div>
          <div className='mt-2 mb-auto cart-product-short-description'>{this.props.item.short_description}</div>
          <button className='btn btn-warning' onClick={() => { this.props.removeItemEntirely(this.props.item.product_id); }}>Remove Item Entirely</button>
        </div>
        <div className='col-2 qty-container'>
          <div className='w-100 mb-3 quantity-title' >Quantity</div>
          <div className='qty-control'>
            <div className='arrow-box cursor-pointer' onClick={() => { this.props.removeItem(this.props.item.cart_item_id); }} >
              <i className='fas fa-minus'></i>
            </div>
            <div className='quantity-box'>{this.props.qty}</div>
            <div className='arrow-box cursor-pointer' onClick={() => { this.props.addToCart(this.props.item.product_id); }} >
              <i className='fas fa-plus'></i>
            </div>
          </div>
          <div className='border-for-workspace-check quantity-sub-total my-3'>
            <div className='d-flex justify-content-center'>Sub Total</div>
            <div className='d-flex justify-content-center'>$ {(this.props.item.price * this.props.qty / 100).toFixed(2)}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(CartSummaryItem);
