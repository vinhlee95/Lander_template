import React, { Component } from 'react';
import request from 'superagent';
import SearchInput from '../LocationSearch/SearchInput';

import './HostSignUp.scss';
import Form from '../Form/Form';
import Modal from '../Modal/Modal';

class HostSignUp extends Component {
  state = {
    name: '', email: '', 
    location: null, address: '', 
    newsletter: false,
    submitSuccess: false
  }

  handleChange = (e, item) => {
    this.setState({ [item]: e.target.value });
  }

  selectLocation = (location, address) => {
    this.setState({ location, address })
  }

  signup = () => {
    const { name, email, location, address, newsletter } = this.state;
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
    // Disable to test snackbar
    // request
    //   .post('https://nodedev.gigleapp.com/gig')
    //   .send(data)
    //   .end((err, res) => {
    //     if(err) { console.log(err) };
    //     if(res) { 
    //       console.log('Successfully registered!')
    //       console.log(data)
    //       console.log(res) 
    //       this.props.submitSuccess();
    //     };
    //   });
    console.log(data);
    this.props.submitSuccess();
  }

  render() {
    const { name, email, newsletter } = this.state;
    const { closeModal, modalShow } = this.props;

    let locationSearch = (
      <SearchInput
        placeholder='Your address'
        selectLocation={(location, address) => this.selectLocation(location, address)}
      />
    )

    return (
      <div onClick={this.props.formClick}>
        <Form
          title='Sign up as host'
          description={`Up for hosting an unforgettable kids'event at your place? Excellent! Some short info about the event here, after which we'll collect the person's email & address. Rest of the interaction will be handed manually by email`}
          buttonLabel='Sign up as a host'
          name={name} email={email} newsletter={newsletter}
          inputChange={(e, item) => this.handleChange(e, item)}
          subscribe={value=> this.setState({ newsletter: value})}
          additionalFields={locationSearch}
          signup={this.signup}
        />
      </div>
    )
  }
}

export default HostSignUp;
