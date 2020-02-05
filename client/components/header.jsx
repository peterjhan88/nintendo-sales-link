import React from 'react';
import { withRouter } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <header className='bg-dark d-flex header-height align-items-center'>
        <div className='ml-3 row mr-auto cursor-pointer' onClick={() => this.props.history.push('/')}>
          <div className='header-logo'><img src='/images/triforce-icon-dark.png'/></div>
          <div className='header-name'>Nintendo Sales - Link</div>
        </div>
        <div className='mr-5 shopping-cart cursor-pointer' onClick={() => this.props.history.push('/cart')} >
          <span>{this.props.cartItemCount} items </span>
          <i className='fas fa-shopping-cart'></i>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
