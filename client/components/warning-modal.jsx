import React from 'react';

class WarningModal extends React.Component {
  render() {
    return (
      <div className='modal-shadow'>
        <div className='modal-warning-body py-3 col-12 col-lg-4'>
          <div className='modal-warning-title mb-3'>
            Warning!
          </div>
          <div className='modal-warning-content px-2'>
            <p>
            Nintendo Sales - Link is a full stack content management app that was created strictly for
              <strong> demonstration purposes</strong>.
            </p>
            <p>
            By clicking the button below, you accept that no purchases will be made,
            no payment processing will be done.
            </p>
            <p>
              <strong>DO NOT USE</strong> actual information in checkout,
            such as real names, addresses, or credit card numbers.
            </p>
          </div>
          <div className="btn btn-danger cursor-pointer" onClick={() => { this.props.removeModalWithConsent(); }}>Accept</div>
        </div>
      </div>
    );
  }
}

export default WarningModal;
