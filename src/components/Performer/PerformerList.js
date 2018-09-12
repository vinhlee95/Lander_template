import React, { Component } from 'react';
import request from 'superagent';
import './PerformerList.scss';
import { Element } from 'react-scroll';

import Button from '../Button/Button';
import AudienceSignup from './AudienceSignup';

const URL = 'https://nodedev.gigleapp.com/gig';

class PerformerList extends Component {

  state = { 
    showInfo: null,
    showAudienceSignup: false,
    showHostSignup: false,
  };

  signupAsAudience = () => this.setState({ showAudienceSignup: true });
  signupAsHost = () => this.setState({ showHostSignup: true });
  closeModal = (type) => {
    if(type === 'audience') { this.setState({ showAudienceSignup: false })};
    if(type === 'host') {
      this.setState({ showHostSignup: false });
    }
  }

  componentDidMount() {
    request
      .post(URL)
      .send({
        mainEvent:"Olkkarikekkerit_18",
        eventId:"show_151118",
        action:"getEvent"
      })
      .end((err, res) => {
        const { area, performer, status, time } = res.body.data;
        this.setState({ showInfo: {area, performer, status, time} });
      })
  }

  render() {
    const { showInfo, showAudienceSignup, showHostSignup } = this.state;
    const showHasHost = showInfo && showInfo.status === 'has host'; // true or false
    let performanceList = 
    showInfo 
    ?
    <div className='temporary-performance-card'>
      <h2>{showInfo.performer.name}</h2>
      <p>{showInfo.area}</p>
      <p>{showInfo.time}</p>
      <Button
        label={
          showHasHost
          ?
          'Tule katsomaan'
          :
          'Varaa keikka'
        }
        className='button card-button'
        onClick={
          showHasHost
          ?
          this.signupAsAudience
          :
          this.signupAsHost
        }
      />
    </div>
    : null
              
    return (
      <div className='body-container'>
        <Element name='performer-list'>
          <h1>Esiintyjat</h1>
          <div className='performance-list'>
            {performanceList}
          </div>
        </Element>
        {
          showAudienceSignup
          ?
          <AudienceSignup
            area={showInfo.area}
            time={showInfo.time}
            performanceName={showInfo.performer.name}
            closeModal={() => this.closeModal('audience')}
            childClassName={showAudienceSignup ? 'children children-show' : 'children children-hide'}   
          />
          : null
        }

      </div>
    )
  }
}

export default PerformerList;
