import React from 'react';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <header className='bg-dark header-nav py-4 px-5'>
        <div className='header-logo-container mr-auto cursor-pointer' onClick={() => this.props.history.push('/')}>
          <div className='header-logo'><img src='/images/triforce-icon-dark.png'/></div>
          <div className='header-name'>Nintendo Sales - Link</div>
        </div>
        <div className='shopping-cart cursor-pointer' onClick={() => this.props.history.push('/cart')} >
          <i className='fas fa-shopping-cart'></i>
          <div className='ml-3 current-items-qty-header'>{this.props.cartItemCount}</div>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
