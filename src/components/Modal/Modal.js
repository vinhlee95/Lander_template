import React, { Component } from 'react';
import './Modal.scss';

class Modal extends Component {
  
  render() {
    const { className, modalShow } = this.props;
    return(
      <div className={className ? className : 'modal'} onClick={this.props.handleCloseModal}>
        <section 
          className={modalShow ? 'children children-show' : 'children children-hide'} 
          onClick={e => e.stopPropagation()}
        >
          {this.props.children}
        </section>
      </div>
    )
  }
}

export default Modal;