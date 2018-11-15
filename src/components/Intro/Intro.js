import React, { Component } from 'react';
import './Intro.scss';
import Button from '../Button/Button';
import { IoIosArrowDown } from 'react-icons/io';
import { Link } from 'react-scroll';
import styled from 'styled-components';
import { media } from '../styles'; 

export default class Intro extends Component {
  render() {
    return (
      <div>
        <HeroContent>
          <HeroContentImg src='https://gigleapp.com/olkkarikekkerit/static/olkkarikekkerilogo.svg' />
          <HeroContentDescription>
            <p>Parhaita lastenelämyksiä naapurin olohuoneessa Helsingissä.</p>
            <p>Me tarjoamme.</p></HeroContentDescription>
        </HeroContent>

        

        <div className='button-group'>
          
        </div>
      </div>
    )
  }
}

const HeroContent = styled.div`
  position:relative;
  
  width:90%;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  margin: 1rem auto;


  ${media.phone`flex-direction:column; `}

`;

const HeroContentImg = styled.img`
  flex:1;
  margin: 1rem;
  height: 40vh;
  padding: 0 3rem;
  border-right: 1px #cccccc solid;
  ${media.phone`border-right:none; `}
`;

const HeroContentDescription = styled.div`
  flex:1;
  margin: 0 3rem;
  font-size:1.8rem;
  text-align:center;
  ${media.phone`font-size:1.5rem; `}
`;
