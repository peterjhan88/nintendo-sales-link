import React from 'react';
import { withRouter } from 'react-router-dom';

class BackButton extends React.Component {
  render() {
    return (
      <div className='col-12 back-to-catalog py-5' onClick={() => this.props.history.goBack()}>
        <i className='fas fa-chevron-left'></i>{' Back'}
      </div>
    );
  }
}

export default withRouter(BackButton);
