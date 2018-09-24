import React, { Component } from 'react';
import './Modal.scss';
import Button from '../Button/Button';
import { Centered, BottomButton, appear, media } from '../styles';  
import HostSignUp from './HostSignUp/HostSignUp';
import { FaCheck, FaAngleLeft, FaTimes  } from 'react-icons/fa';
import styled, { css } from 'styled-components';


 

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
    const { state } = this.state;
    const { className } = this.props;

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
      <ModalBase onClick={this.props.handleCloseModal}>
        {content}
      </ModalBase>
    )
  }

  /* content */

  showDescription = () => {
    let backgroundImage, performerName, time, description;
    if (this.props.modalParams){
        backgroundImage= this.props.modalParams.performer.image;
        performerName = this.props.modalParams.performer.name;
        time=this.props.modalParams.time;
        description=this.props.modalParams.performer.description;
    }

    return (
      <ModalContent onClick={(e) => e.stopPropagation()} >
        
        <HeroImage style={{backgroundImage:'url('+backgroundImage+')'}} >
          
        </HeroImage>

        <ModalDescription dangerouslySetInnerHTML={this.innerHtml(description)} />
        <BottomButton 
          onClick={()=>this.setState({state:'form'})}
        >Jatka</BottomButton>
       <ModalHeader>
         
         <HeroTitle>{performerName} olohuoneessasi {time}</HeroTitle>
         <HeaderButton onClick={this.props.handleCloseModal}><FaTimes  /></HeaderButton>
       </ModalHeader>
      </ModalContent>
    );
  }

  showSignupForm = () => {
    const { name, email, newsletter } = this.state;
    console.log('signup form showed')
    return (
        <ModalContent onClick={(e) => e.stopPropagation()} >
          <HostSignUp
            agent={this.props.agent}
            modalParams={this.props.modalParams}
            submitSuccess={this.submitSuccess}
            formClick={e => e.stopPropagation()}
          />
          <ModalHeader>
         <HeaderButton onClick={()=>this.setState({state:'showDescription'})}><FaAngleLeft  /></HeaderButton>
         <HeroTitle>Ilmoita olkkarisi</HeroTitle>
         <HeaderButton onClick={this.props.handleCloseModal}><FaTimes  /></HeaderButton>
       </ModalHeader>
        </ModalContent>
    )
  }

  showSuccess = () => {
    let backgroundImage, performerName, time, description;
    if (this.props.modalParams){
        backgroundImage= this.props.modalParams.performer.image;
        performerName = this.props.modalParams.performer.name;
        time=this.props.modalParams.time;
        description=this.props.modalParams.performer.description;
    }
    return(
      <ModalContent onClick={(e) => e.stopPropagation()} >
        <HeroImage style={{backgroundImage:'url('+backgroundImage+')'}} >
          <HeroTitle>Tilaus lähetetty</HeroTitle>
        </HeroImage>
        <Centered textAlign='center'>
          <FaCheck size={80} color='green' />
          <p>Kiitos tilauksesta!</p>
          <p>Saat meiltä sähköpostia ihan pian! Tarkistelemme tiedot, varmistamme tilauksen ja kerromme lisää tapahtuman kulusta.</p>
        </Centered>
        <BottomButton 
          onClick={this.props.handleCloseModal}
        >Sulje ikkuna</BottomButton>
      </ModalContent>
    )
  }

  innerHtml = (html) => { return { __html: html }; };

  

}

/* styles */

const ModalHeader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  
  width: 100%;
  height:10vh;
  background: rgba(255,255,255,.75);
  display:flex;
  justify-content:space-between;
  align-items:center;
  
`;

const ModalBase = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0, .7);
  width: 100%;
  height: 100%;
  
  
`;

const ModalContent = styled.div`

  background: #fff;
  width: 50%;
  position: absolute;
  height: 90vh;
  top: 5vh;
  left: 25%;
  border-radius: 10px;
  transition: all;
  overflow: auto;
  
  animation: ${appear} .3s ease;

  ${media.big`width:60%; left: 20%;`}
  ${media.desktop`width:70%; left: 15%; `}
  ${media.tablet`width:80%; left: 10%; `}
  ${media.phone`
    width:100%; 
    height:100%;
    position: fixed;
    top:0;
    left:0;
  `}
`;

const HeroImage = styled.div`
  position:relative;
  border-radius: 10px 10px 0 0;
  background:#dddddd;
  background-size: cover;
  background-position: top center;
  height: 50%;
`;

const HeroTitle = styled.div`
  
  text-align:center;
  font-size:1.5rem;
  color: black;

  ${media.phone`
    font-size:1.2rem;
  `}
  
`;

const HeaderButton = styled.div`
  
  font-size:1.6rem;
  padding: .5rem;
  
`;

const ModalDescription = styled.div`
  margin: 2rem;
  height:30%;
  overflow: auto;
`;



export default Modal;