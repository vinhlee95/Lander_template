import React, { Component } from 'react';
import request from 'superagent';

import Input from '../Input/Input';
import { Switch } from '@material-ui/core';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

export default class AudienceSignup extends Component {
  state = {
    name: '', email: '', audienceNumber: '', newsletter: false
  }
  render() {
    const { name, email, audienceNumber, newsletter} = this.state;
    const { childClassName, closeModal } = this.props;
    return (
      <Modal
        childClassName={childClassName}
        handleCloseModal={closeModal}
      >
        <div className='form-content'
        onClick={this.formClick}>
          <h2>Come see a show</h2>
          <p className='description'>
            
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
      </div>
      </Modal>
    )
  }
}
