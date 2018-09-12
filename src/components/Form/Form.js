import React, { Component } from 'react';
import './Form.scss';
import Input from '../Input/Input';
import { Switch } from '@material-ui/core';
import Button from '../Button/Button';

export default class Form extends Component {
  
  render() {
    const { 
      title, description, buttonLabel,
      name, email, newsletter, 
      inputChange, subscribe, signup, furtherInfo,
      additionalFields
    } = this.props;
    return (
      <div className='form-content'>
          <h2>{title}</h2>
          <p className='description'>{description}</p>
          <p>Personal information</p>
          <Input
            value={name}
            placeholder='Your name'
            onChange={(e) => inputChange(e, 'name')}
          />
          <Input
            value={email}
            placeholder='Your email'
            onChange={(e) => inputChange(e, 'email')}
            bottomLabel={<span>We'll continue talking through email after getting in touch with you</span>}
          />

          {additionalFields}

          <section className='newsletter'>
            <span>All of these is very interesting. I want to stay updated about similar events and happenings with a Gigle newsletter</span>
            <Switch
              checked={newsletter}
              onChange={e => subscribe(e.target.checked)}
              color='primary'
            />
          </section>
          <Button
            label={buttonLabel}
            onClick={signup}
          />
          <span>{furtherInfo}</span>
      </div>
    )
  }
}
