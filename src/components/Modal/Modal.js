import React, { Component } from 'react';
import './Modal.scss';
import Input from '../Input/Input';
import { Switch, lightGreen
} from '@material-ui/core';
import Button from '../Button/Button';


class Modal extends Component {
  state = {
    name: '', email: '', address: '',
    subscribe: false,
  }

  handleChange = (e, item) => {
    this.setState({ [item]: e.target.value });
  }

  formClick = e => {
    e.stopPropagation();
    console.log('form clicked')
  }

  render() {
    const { name, email, address, subscribe } = this.state;
    console.log(this.state.subscribe)
    return(
      <div className='modal' onClick={this.props.handleCloseModal}>
        <div className='form' onClick={this.formClick}>
          <section className='form-content'>
            <h2>Sign up as host</h2>
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
            <Input
              value={address}
              placeholder='Your address'
              onChange={(e) => this.handleChange(e, 'address')}
              bottomLabel={<span>The events are organized in XXYY area</span>}
            />
            <section className='newsletter'>
              <span>All of these is very interesting. I want to stay updated about similar events and happenings with a Gigle newsletter</span>
              <Switch
                checked={subscribe}
                onChange={e => this.setState({
                  subscribe: e.target.checked
                })}
                color='primary'
              />
            </section>
            <Button
              label='I am interested in hosing a gig'
            />
          </section>
        </div>
      </div>
    )
  }
}

export default Modal;