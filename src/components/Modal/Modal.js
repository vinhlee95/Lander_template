import React, { Component } from 'react';
import './Modal.scss';

class Modal extends Component {
  
  render() {
    const { className, childClassName } = this.props;
    return(
      <div className={className ? className : 'modal'} onClick={this.props.handleCloseModal}>
        <section 
          className={childClassName ? childClassName : 'children'} 
          onClick={e => e.stopPropagation()}
        >
          {this.props.children}
        </section>
      </div>
    )
  }
}

export default Modal;