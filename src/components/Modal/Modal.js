import React, { Component } from 'react';
import './Modal.scss';
import request from 'superagent';

import Input from '../Input/Input';
import { Switch } from '@material-ui/core';
import Button from '../Button/Button';
import SearchInput from '../LocationSearch/SearchInput';
import { HeroImage, HeroTitle } from '../styles';  



class Modal extends Component {
  state = {
    name: '', email: '', 
    location: null, address: '', postalCode: '',
    newsletter: false,
    submitSuccess: false
  }

  handleChange = (e, item) => {
    this.setState({ [item]: e.target.value });
  }
  
  // prevent model from disappearing
  formClick = e => {
    e.stopPropagation();
  }

  selectLocation = (location, address) => {
    this.setState({ location, address })
  }

  signup = () => {
    const { name, email, location, address, postalCode, newsletter } = this.state;
    const addarr = address.split(',');

    // get specific address elements
    const street = addarr.slice(0, 1).toString();
    const city = addarr.slice(addarr.length -2, addarr.length -1).toString();
    const country =addarr.slice(addarr.length -1, addarr.length).toString();
    
    const data = {
      action:'signUpAsHost',  // for server
      eventId: 'Olkkarikekkerit_18', 
      name,
      email,
      location,
      address,
      street, city, country, 
      newsletter
    }
    request
      .post('https://nodedev.gigleapp.com/gig')
      .send(data)
      .end((err, res) => {
        if(err) { console.log(err) };
        if(res) { 
          console.log('Successfully registered!')
          console.log(data)
          console.log(res) 
          this.props.submitSuccess();
        };
      });
  }

  render() {
    const { state, name, email, newsletter } = this.state;
   
    console.log('MODAL:',this.props);
    
    let content;
    switch (state) {
      case 'form':
        content=this.showForm();
      break;

      default:
        content=this.showDescription();
      break;
    }

    return(
      <div className='modal' onClick={this.props.handleCloseModal}>
        <div className={this.props.formClassName ? this.props.formClassName : 'form'} onClick={this.formClick}>
          {content}
          
        </div>
          }
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

    return <div>
      <HeroImage style={{backgroundImage:'url('+backgroundImage+')'}} >
              <HeroTitle>{performerName} olkkariisi {time}?</HeroTitle>
      </HeroImage>
      <Button
          label='I am interested in hosing a gig'
          onClick={()=>this.setState({state:'form'})}
        />
    </div>
  }

  showForm = () => {
    const { name, email, newsletter } = this.state;
    return <div>
      <section className='form-content'>
            
            <p className='description'>
              Up for hosting an unforgettable kids'event at your place? Excellent! Some short info about the event here, after which we'll collect the person's email & address. Rest of the interaction will be handed manually by email
            </p>
            <Input
              value={name}
              placeholder='Your name'
              onChange={(e) => this.handleChange(e, 'name')}
            />
            <Input
              value={email}
              placeholder='Your email'
              onChange={(e) => this.handleChange(e, 'email')}
              bottomLabel={<span>We'll continue talking through email after getting in touch with you</span>}
            />

            <SearchInput
              placeholder='Your address'
              selectLocation={(location, address) => this.selectLocation(location, address)}
            />

            <section className='newsletter'>
              <span>All of these is very interesting. I want to stay updated about similar events and happenings with a Gigle newsletter</span>
              <Switch
                checked={newsletter}
                onChange={e => this.setState({
                  newsletter: e.target.checked
                })}
                color='primary'
              />
            </section>
            <Button
              label='I am interested in hosing a gig'
              onClick={this.signup}
            />
          </section>
    </div>

  }

}

export default Modal;