import React from 'react';

const Icon= props => {
 
  return (
    <svg
      width={props.width || props.icon.width}
      height={props.height || props.icon.height}
	    id="Layer_1" 
	    data-name="Layer 1" 
	    xmlns="https://www.w3.org/2000/svg"
	    viewBox={props.icon.viewBox}
   	>
    <title>flatIconSet</title>
    {(props.icon.rectWidth) ? <rect 
      width={props.icon.rectWidth}
      height={props.icon.rectHeight}
    	style={{fill:props.icon.rectFill}}
    /> : null}
      <path
        d={props.icon.path1}
        style={{fill:props.icon.pathFill}}
      ></path>
      {(props.icon.path2) ? <path d={props.icon.path2} style={{fill:props.icon.pathFill2}}/> : null}
    </svg>
  ); 
};

export default Icon