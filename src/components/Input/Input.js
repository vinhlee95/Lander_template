import React from 'react';
import './Input.scss';

const Input = (props) => {
  return(
    <div className='input' style={props.style}>
      <input
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className={props.className}
      />
      {
        props.bottomLabel
        ?
        props.bottomLabel
        : 
        null
      }
    </div>
  )
}

export default Input;