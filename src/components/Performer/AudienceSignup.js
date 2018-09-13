import React, { Component } from 'react';
import request from 'superagent';
import Modal from '../Modal/Modal';
import Form from '../Form/Form';

class AudienceSignup extends Component {
  state = {
    name: '', email: '', participantNumber: '', newsletter: false
  }

  inputChange = (e, item) => {
    this.setState({ [item]: e.target.value });
  }

  signup = () => {
    // save data here
    console.log(this.state);
    this.props.submitSuccess();
  }

  renderOptions = (min, max) => {
    let optionList = [];
    for(let i = min; i <= max; i++) {
      optionList.push(i);
    }
    return optionList.map(numb => {
      return <option key={numb} value={numb}>{numb}</option>
    });
  }


  render() {
    const { name, email, participantNumber, newsletter} = this.state;
    const { area, time,performanceName, modalShow, closeModal, } = this.props;

    let participantSelection = (
      <div className='selection'>
        <p>Number of participants</p>
        <select
        value={participantNumber}
        onChange={(e) => this.setState({ participantNumber: e.target.value})}
        >
          {this.renderOptions(1, 20)}
        </select>
      </div>
     
    )

    return (
      <Modal
        className='audience-signup-modal modal'
        modalShow={modalShow}
        handleCloseModal={closeModal}
      >
        <Form
          title='Come to see a show'
          description={`We welcome you to see ${performanceName} at ${area} on ${time}.`}
          buttonLabel='Signup for Olkkarikekkerit!'
          email={email} name={name} newsletter={newsletter}
          inputChange={(e, item) => this.inputChange(e, item)}
          signup={this.signup}
          subscribe={(value) => this.setState({ newsletter: value })}
          furtherInfo={`We'll ge back to you by email shortly to give you more information and plan the gig.`}
          additionalFields={participantSelection}
          signup={this.signup}
        />
      </Modal>
    )
  }
}

export default AudienceSignup;
