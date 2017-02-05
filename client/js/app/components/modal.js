import { connect } from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import classNames from 'classnames';

import React, { Component, PropTypes } from 'react';

class Modal extends Component {

  stopPropagation( event ) {
    event.stopPropagation();
  }

  renderHeader() {

    const {
      modal,
      account,
      admin
    } = this.props;

    var title = '';

    // if (modal.modalType === 'uploadGuideline') {
    //   title = 'Upload Data Guideline';
    // }

    // if ( modal.modalType === 'createAccount' && !admin.createUserFlow.part4 ) {
    //   title = 'Create User';
    // }

    // if ( modal.modalType === 'editAccount' && !admin.createUserFlow.part4 ) {
    //   title = 'Edit User';
    // }

    if ( title.length > 0 ) {
      return (
        <div className="modal-header-section">
          <h4 className="modal-header">{ title }</h4>
        </div>
      );
    }

    return null;
  }

  renderModalBody() {

    const {
      modal,
      dispatch
    } = this.props;

    // if ( modal.modalType === 'help' ) {
    //   return (
    //     <HelpForm onClickCancel={ () => dispatch(modalActions.closeModal()) } />
    //   );
    // }

    // if ( modal.modalType === 'uploadGuideline' ) {
    //   return (
    //     <UploadGuideline />
    //   );
    // }

    // if ( modal.modalType === 'createAccount' || modal.modalType === 'editAccount' ) {
    //   return (
    //     <CreateAccount onClickCancel={ () => dispatch(adminActions.resetAccountInfoAndCloseModal()) } />
    //   );
    // }

    return null;
  }

  renderModalContent() {
    const {
      children,
      modal,
      dispatch
    } = this.props;

    var closeModalFadeOverlay = () => dispatch(modalActions.closeModal());
    var closeModalInput = () => dispatch(modalActions.closeModal());

    // if ( modal.modalType === 'createAccount' ||  modal.modalType === 'editAccount' ) {
    //   closeModalFadeOverlay = () => {};
    //   closeModalInput = () => dispatch(adminActions.resetAccountInfoAndCloseModal());
    // }

    if ( modal.isModalOpen ) {
      
      return (
        <div className="modal">
          <div 
            className="fade-overlay" 
            onClick={ closeModalFadeOverlay }
          >
            <div 
              className="modal-content"
              onClick={ this.stopPropagation }
            >
              <input 
                type="button" 
                className="icon modal-close-btn" 
                onClick={ closeModalInput } 
                value="x"
              />
              {this.renderHeader()}
              <div className="modal-body-section">
                <div className="modal-body">
                  { this.renderModalBody() }
                </div>
              </div> 
            </div>
          </div>
        </div>
      )
    }

    return null;
  }

  render() {

    const {
      modal
    } = this.props;

    if ( !this.bodyElement ) {
      this.bodyElement = document.querySelector( 'body' );
    }

    if ( modal.isModalOpen ) {
      if ( this.bodyElement.classList ) {
        this.bodyElement.classList.add( 'modal-activated' );
      } else {
        // For IE 9, since it doesn't support classList
        this.bodyElement.className += ' modal-activated'; 
      }
    } else {
      if ( this.bodyElement.classList ) {
        this.bodyElement.classList.remove( 'modal-activated' );
      } else {
        // For IE 9, since it doesn't support classList
        this.bodyElement.className = this.bodyElement.className.replace( /\bmodal-activated\b/, '' );
      }
    }

    var modalOptionalClass = classNames({
      // 'account-modal': modal.modalType === 'createAccount' || modal.modalType === 'editAccount',
      // 'upload-guideline-modal': modal.modalType === 'uploadGuideline'
    });

    return (
      <div id="modal" className={modalOptionalClass}>
        <ReactCSSTransitionGroup transitionName="modal-animation" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          { this.renderModalContent() }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
};

Modal.bodyElement = null;

function select( newState ) {
  return {
    modal: newState.modal
  };
}

export default connect(select)(Modal);