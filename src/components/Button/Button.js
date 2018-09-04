import React from 'react';
import './Button.scss';

const Button = (props) => {
  return(
    <div className='button'>
      <span className='label'>{props.label}</span>
      <span>{props.subLabel}</span>
    </div>
  )
}

export default Button;