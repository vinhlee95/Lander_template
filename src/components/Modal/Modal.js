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
    const { name, description } = performer;
    this.state = {
      state,
      name, description, time
    }
  }


  submitSuccess = () => this.setState({ state: 'submitSuccess' })
  
  render() {
    const { state, name, time, description } = this.state;
    const { className, modalShow } = this.props;
    console.log(description)

    // render modal content conditionally
    let content;
    switch (state) {
      case 'form':
        console.log('show signup form');
        content=this.showSignupForm();
      break;

      case 'submitSuccess': 
        content=this.showSuccess();
      break;

      case 'showDescription':
        console.log('show description');
        content=this.showDescription();
      break;

      default:
        content=null
    }

    return(
      <div className={className ? className : 'modal'} onClick={this.props.handleCloseModal}>
        {content}
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
      <div className='description-modal' onClick={(e) => e.stopPropagation()} >
        <HeroImage style={{backgroundImage:'url('+backgroundImage+')'}} >
          <HeroTitle>{performerName} olkkariisi {time}?</HeroTitle>
        </HeroImage>
        <div className='description' dangerouslySetInnerHTML={{__html: this.state.description}} />
        <Button
          label='Host this show'
          onClick={()=> {
            this.setState({state:'form'});
          }}
        />
      </div>
    )
  }

  showSignupForm = () => {
    const { name, email, newsletter } = this.state;
    console.log('signup form showed')
    return (
        <HostSignUp
          submitSuccess={this.submitSuccess}
          formClick={e => e.stopPropagation()}
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