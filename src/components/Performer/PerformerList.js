import React, { Component } from 'react';
import request from 'superagent';
import PerformanceCard from '../PerformanceCard';
import './PerformerList.scss';
import { Element } from 'react-scroll';

const URL = 'https://nodedev.gigleapp.com/gig';

class PerformerList extends Component {

  state = { showInfo: null };

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
    const { showInfo } = this.state; console.log(showInfo)
    let performanceList = 
    showInfo 
    ?
    <div className='temporary-performance-card'>
      <h2>{showInfo.performer.name}</h2>
      <p>{showInfo.area}</p>
      <p>{showInfo.time}</p>
      
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
      </div>
    )
  }
}

export default PerformerList;
