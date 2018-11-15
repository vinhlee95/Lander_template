import React, { Component } from 'react';
import './Modal.scss';
import Button from '../Button/Button';
import { Centered, BottomButton, BottomArea, appear, media } from '../styles';  
import SignUp from './SignUp/SignUp';
import { FaCheck, FaAngleLeft, FaTimes, FaClock, FaMapMarker  } from 'react-icons/fa';
import styled, { css } from 'styled-components';


 

class Modal extends Component {
  constructor(props) {
    super(props);
    console.log('Launching modal: ',props);
    const { state, modalParams } = this.props;
    const { performer, time } = modalParams;
    const { name, description } = performer;
    this.state = {
      state,
      name, description, time,
      gigStatus:modalParams.status.value
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
        content=this.showSignupForm(this.state.gigStatus);
      break;

      case 'submitSuccess': 
        content=this.showSuccess();
      break;

      case 'showDescription':
        console.log('show description');
        content=this.showDescription(this.state.gigStatus);
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

  showDescription = (gigStatus) => {
    
    let backgroundImage, performerName, time, description, area, title, buttonLabel, placeTime, button;
    if (this.props.modalParams){
        backgroundImage= this.props.modalParams.performer.image;
        performerName = this.props.modalParams.performer.name;
        time=this.props.modalParams.time;
        area=this.props.modalParams.area;
        description=this.props.modalParams.performer.description;
    }

    switch (gigStatus) {
      
      case 1:
        title = <div>{performerName}</div>;
        buttonLabel = 'Ilmoittaudu keikalle';
        
        
        button = <BottomButton 
            onClick={()=>this.setState({state:'form'})}
          >
            <div style={{flex:1}}>Ilmoittaudu keikalle</div>
            <div style={{flex:1, fontSize:'.9rem'}}><div><FaMapMarker/>&nbsp; {area}</div><div> <FaClock/>&nbsp; {time}</div></div>;
          </BottomButton>
      break;

      case 2:
        title= performerName+' olohuoneessasi '+time;
        button = <BottomButton 
           disabled
          >
            <div style={{flex:1}}>Tulossa pian</div>
          
          </BottomButton>
      break;

      default:
        title= performerName+' olohuoneessasi '+time
        button = <BottomButton 
            onClick={()=>this.setState({state:'form'})}
          >
            <div style={{flex:1}}>Jatka</div>
            
          </BottomButton>
    }

    return (
      <ModalContent onClick={(e) => e.stopPropagation()} >
        
        <HeroImage style={{backgroundImage:'url('+backgroundImage+')'}} />
          
        
        
        <ModalDescription dangerouslySetInnerHTML={this.innerHtml(description)} />
        <BottomArea>
          {button}
          <BookLink onClick={this.goToGigle}>Etkö pääse keikalle? <u>Tilaa esiintyjä kotiisi!</u></BookLink>
        </BottomArea>
       <ModalHeader>
         
         <HeroTitle>{title}</HeroTitle>
         <HeaderButton onClick={this.props.handleCloseModal}><FaTimes  /></HeaderButton>
       </ModalHeader>
      </ModalContent>
    );
  }

  showSignupForm = (gigStatus) => {
    const { name, email, newsletter } = this.state;
    console.log('signup form showed');

    let title, content;
    switch (gigStatus) {
      case 1:
        title='Ilmoittaudu keikalle';
        
      break;

      default:
        title='Ilmoita olkkarisi';
        
    }

    return (
        <ModalContent onClick={(e) => e.stopPropagation()} >
          <SignUp
            agent={this.props.agent}
            modalParams={this.props.modalParams}
            submitSuccess={this.submitSuccess}
            formClick={e => e.stopPropagation()}
          />
          <ModalHeader>
             <HeaderButton onClick={()=>this.setState({state:'showDescription'})}><FaAngleLeft  /></HeaderButton>
             <HeroTitle>{title}</HeroTitle>
             <HeaderButton onClick={this.props.handleCloseModal}><FaTimes  /></HeaderButton>
           </ModalHeader>
        </ModalContent>
    )
  }

  showSuccess = () => {

    const { status, performer, time } = this.props.modalParams;
    let backgroundImage, performerName, title, description;

    
    switch (status.value) {
      case 1:
        title = 'Keikkailmoittautuminen lähetetty'
        description = <div>
            <p>Kiitos ilmoittautumisesta!</p>
            <p>Otamme yhteyttä sähköpostitse piakkoin!</p>
          </div>
      break;

      default:
        title = 'Esiintyjä tilattu!'
        description = <div>
            <p>Kiitos tilauksesta!</p>
            <p>Lähetämme vahvistuksen sähköpostiisi ja valitsemme olohuoneet 15.10. ilmoittautuneiden joukosta.</p>
          </div>
      break;
    }
    //if (this.props.modalParams){
        backgroundImage= performer.image;
        //performerName = performer.name;
        //description=performer.description;
    //}
    return(
      <ModalContent onClick={(e) => e.stopPropagation()} >
        <HeroImage style={{backgroundImage:'url('+backgroundImage+')'}} >
          
        </HeroImage>
        <Centered textAlign='center'>
          <FaCheck size={80} color='green' />
          {description}
        </Centered>
        <BottomButton 
          onClick={this.props.handleCloseModal}
        >Sulje ikkuna</BottomButton>
      </ModalContent>
    )
  }

  innerHtml = (html) => { return { __html: html }; };

  goToGigle = () => {
    window.open('https://gigleapp.com/search/?tg=tag_2','gigle');
  }

}



/* styles */

const ModalHeader = styled.div`
  position: fixed;
  top: 5vh;
  left: 25%;
  
  margin: 0;
  width: 50%;
  height:10vh;
  background: rgba(255,255,255,.75);
  display:flex;
  justify-content:space-between;
  align-items:center;
  
  ${media.big`width:60%; left:20%;`}
  ${media.desktop`width:70%; left:15%; `}
  ${media.tablet`width:80%; left:10%; `}
  ${media.phone`
    width:100%; 
    top:0;
    left:0;
  `}

`;

const ModalBase = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0,0,0, .7);
  width: 100%;
  height: 100%;
  z-index:10;
  
`;

const ModalContent = styled.div`

  background: #fff;
  width: 50%;
  left:25%;
  position: fixed;
  height: 90vh;
  top: 5vh;
  margin: 0 auto;
  border-radius: 10px;
  transition: all;
  overflow: auto;
  
  animation: ${appear} .3s ease;

  ${media.big`width:60%; left:20%;`}
  ${media.desktop`width:70%; left:15%; `}
  ${media.tablet`width:80%; left:10%; `}
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
  width:100%;

  ${media.phone`
    font-size:1.2rem;
  `}
  
`;

const HeaderButton = styled.div`
  
  font-size:1.6rem;
  padding: 1rem;
  
`;

const ModalDescription = styled.div`
  margin: 2rem;
  margin-bottom:20rem;
 
  

`;

const BookLink = styled.div`
  cursor:pointer;
  padding-top: 1rem;
  &:hover { opacity: .6; }
  

`;



export default Modal;