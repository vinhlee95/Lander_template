import React, { Component } from 'react';
import './Form.scss';
import Input from '../Input/Input';

import Switch from '@material-ui/core/Switch';



export default class Form extends Component {
  
  render() {
    const { 
      title, description, buttonLabel, loading, error, errorMessage,
      name, email, newsletter, roomProps,
      inputDisabled, inputChange, subscribe, signup, furtherInfo,
      additionalFields, params
    } = this.props;
    return (
      <div className='form-content'>
          <h2>{title}</h2>
          <p className='description'>{description}</p>
          
          <Input
            value={name}
            placeholder='Nimi'
            onChange={(e) => inputChange(e, 'name')}
            disabled={inputDisabled}
          />
          {
            errorMessage && errorMessage.name
            ?
            <p className='error-message'>{errorMessage.name}</p>
            : null
          }
          <Input
            value={email}
            placeholder='Sähköposti'
            onChange={(e) => inputChange(e, 'email')}
            
            disabled={inputDisabled}
          />
          {
            errorMessage && errorMessage.email
            ?
            <p className='error-message'>{errorMessage.email}</p>
            : null
          }

          {additionalFields}
          {
            errorMessage && errorMessage.address
            ?
            <p className='error-message'>{errorMessage.address}</p>
            : null
          }
          
          <section className='newsletter'>
            <span>Haluan Giglen uutiskirjeen mailiini, jotta saan tietää tulevista tapahtumista ja keikoista ensimmäisten joukossa.</span>
            <Switch
              checked={newsletter}
              onChange={(e,checked) => inputChange(checked,'newsletter','checkbox')}
              color='primary'
            />
          </section>
          {
            loading
            ?
            <section className='loading-container'>
              {loading}
            </section>
            : null
          }
          {
            error
            ?
            error
            : null
          }
          
          <span>{furtherInfo}</span>
      </div>
    )
  }
}
