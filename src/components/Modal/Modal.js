import React, { Component } from 'react';
import './Modal.scss';
// <<<<<<< HEAD
// =======
import request from 'superagent';
import Button from '../Button/Button';
import { HeroImage, HeroTitle } from '../styles';  
import HostSignUp from '../HostSignUp/HostSignUp';
import { FaCheck } from 'react-icons/fa';


// >>>>>>> 0d9178f9c6e36f8cadd82f595538cc52836f7b05

class Modal extends Component {
  constructor(props) {
    super(props);
    const { state, modalParams } = this.props;
    const { performer, time } = modalParams;
    const { name } = performer;
    this.state = {
      state,
      name, time
    }
  }


  submitSuccess = () => this.setState({ state: 'submitSuccess' })
  
  render() {
    const { state, name, time } = this.state;
    const { className, modalShow } = this.props;

    // render modal content conditionally
    let content;
    switch (state) {
      case 'form':
        content=this.showSignupForm();
      break;

      case 'submitSuccess': 
        content=this.showSuccess();
      break;

      default:
        content=this.showDescription();
      break;
    }

    return(
      <div className={className ? className : 'modal'} onClick={this.props.handleCloseModal}>
        <section 
          className={modalShow ? 'children children-show' : 'children children-hide'} 
          onClick={e => e.stopPropagation()}
        >
          {content}
        </section>
      </div>
    )
  }

  showDescription = () => {
    let backgroundImage, performerName, time;
    if (this.props.modalParams){
      backgroundImage= this.props.modalParams.performer.image;
      performerName = this.props.modalParams.performer.name;
      time=this.props.modalParams.time;
  }

    return (
      <div className='description-modal'>
        <HeroImage style={{backgroundImage:'url('+backgroundImage+')'}} >
          <HeroTitle>{performerName} olkkariisi {time}?</HeroTitle>
        </HeroImage>
        <Button
          label='I am interested in hosing a gig'
          onClick={()=>this.setState({state:'form'})}
        />
      </div>
    )
  }

  showSignupForm = () => {
    const { name, email, newsletter } = this.state;
    return (
      <HostSignUp
        submitSuccess={this.submitSuccess}
      />
    )
  }

  showSuccess = () => {
    return(
      <div className='success-modal'>
        <h1>Congratulation!</h1>
        <p>You will host {this.state.name} on {this.state.time}  </p>
        <p>We'll get in touch with you soon by email!</p>
        <FaCheck size={40} color='green' />
      </div>
    )
  }

}

export default Modal;