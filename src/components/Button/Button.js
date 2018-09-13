import React from 'react';
import './Button.scss';

const Button = (props) => {
  return(
    <div className='button' onClick={props.onClick}>
      {props.leftIcon ? props.leftIcon : null}
      <section className='label-container'>
        <span className='label'>{props.label}</span>
        <span>{props.subLabel}</span>
      </section>
    </div>
  )
}

export default Button;