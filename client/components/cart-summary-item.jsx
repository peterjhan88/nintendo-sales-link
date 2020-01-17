import React from 'react';

export default class CartSummaryItem extends React.Component {

  render() {
    return (
      <div className='col-11 my-3 py-3 d-flex align-items-center justify-content-center card row card-cart'>
        <div className='image-container-cart col-5'>
          <img src={this.props.item.image} alt={this.props.item.name} className='image-contain'/>
        </div>
        <div className='card-body d-flex flex-column card-body-cart col-4'>
          <h3 className='cart-product-name'>{this.props.item.name}</h3>
          <div className='cart-product-price'>{`$ ${(this.props.item.price / 100).toFixed(2)}`}</div>
          <div className='mt-2 mb-auto cart-product-short-description'>{this.props.item.shortDescription}</div>
          <button className='btn btn-warning' onClick={() => { this.props.removeItemEntirely(this.props.item.productId); }}>Remove Item Entirely</button>
        </div>
        <div className='col-2'>
          <div className='col-12 d-flex flex-column justify-content-center'>
            <div className='w-100 quantity-title mb-4' >Quantity</div>
            <div className='row d-flex align-items-center justify-content-center'>
              <div className='quantity-box ml-4'>{this.props.qty}</div>
              <div className='ml-3'>
                <div className='arrow-box cursor-pointer mb-3' onClick={() => { this.props.addToCart({ productId: this.props.item.productId }); }} >
                  <i className='fas fa-caret-up'></i>
                </div>
                <div className='arrow-box cursor-pointer mt-3' onClick={() => { this.props.removeItem(this.props.item.cartItemId); }} >
                  <i className='fas fa-caret-down'></i>
                </div>
              </div>
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
