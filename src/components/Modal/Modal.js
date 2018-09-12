import React, { Component } from 'react';
import './Modal.scss';

class Modal extends Component {
  
  render() {
    return(
      <div className='modal' onClick={this.props.handleCloseModal}>
        <section className={this.props.childClassName ? this.props.childClassName : 'children'}>
          {this.props.children}
        </section>
      </div>
    )
  }
}

export default Modal;