import React from 'react';
import { withRouter } from 'react-router-dom';

class BackButton extends React.Component {
  render() {
    return (
      <div className='back-to-catalog py-lg-5' onClick={() => this.props.history.goBack()}>
        <i className='fas fa-chevron-left'></i>{' Back'}
      </div>
    );
  }
}

export default withRouter(BackButton);
