import React, { Component } from 'react';
import request from 'superagent';
import SearchInput from '../LocationSearch/SearchInput';

import './HostSignUp.scss';
import Form from '../Form/Form';
import MDSpinner from 'react-md-spinner';

class HostSignUp extends Component {
  state = {
    name: '', email: '', 
    location: null, address: '', 
    newsletter: false,
    submitSuccess: false,
    loading: false,
    errorMessage: {},
  }

  handleChange = (e, item) => {
    this.setState({ [item]: e.target.value });
  }

  selectLocation = (location, address) => {
    this.setState({ location, address })
  }

  signup = () => {
    this.setState({ loading: true });
    const { name, email, location, address, newsletter, errorMessage } = this.state;

    // Error handling
    const obj = {name, email, address}; 
    const empty = Object.keys(obj).filter(key => obj[key] === '');

    let newErrorMessage = {};
    empty.forEach(key => {
      newErrorMessage = {
        ...newErrorMessage,
        [key]: `Please fill in your ${key}`
      }
      this.setState({ errorMessage: newErrorMessage})
    })
    const addarr = address.split(',');

    // get specific address elements
    const street = addarr.slice(0, 1).toString();
    const city = addarr.slice(addarr.length -2, addarr.length -1).toString();
    const country =addarr.slice(addarr.length -1, addarr.length).toString();
    
    const data = {
      mainEvent:'Olkkarikekkerit_18',
      eventId:'gig_151118',
      action:'signUpAsHost',
      name,
      email,
      location,
      address,
      street, city, country, 
      newsletter,
      error: '',
    }
    // Disable to test snackbar
    request
      .post('https://nodedev.gigleapp.com/gig')
      .send(data)
      .end((err, res) => {
        if(err) { console.log(err) };
        if(res && res.body.success) { 
          console.log('Successfully registered!');
          this.props.submitSuccess();
        };
        if(res && res.body.error) {
          this.setState({ error: 'Please make sure that you have filled in all necessary information above', loading: false })
        }
      });
  }

  render() {
    const { name, email, newsletter, loading, error, errorMessage } = this.state; 
    console.log(errorMessage)

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
          loading={
            loading
            ?
            <MDSpinner size={40} singleColor='green' className='spinner' />
            :
            null
          }
          error={
            error
            ?
            <p style={{ textAlign: 'center', color: 'red'}}>{error}</p>
            : null
          }
          errorMessage={errorMessage}
        />
      </div>
    )
  }
}

export default HostSignUp;
