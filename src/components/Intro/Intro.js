import React, { Component } from 'react';
import './Intro.scss';
import Button from '../Button/Button';
import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-scroll';

export default class Intro extends Component {
  render() {
    return (
      <div className='intro-container'>
        <section className='intro-title'>
          <h1>Olkkarikekkerit 15.11 - 15.12</h1>
          <h1>Parasta lastenohjelmaa livenä lähiolkkarissasi</h1>
        </section>

        <Link
          to='performer-list'
          smooth
          duration={500}
        >
          <section className='see-more-button'>
            <IoIosArrowDown size={30} />
            <span>Katso lisää</span>
          </section>
        </Link>

        <div className='button-group'>
          
        </div>
      </div>
    )
  }
}
