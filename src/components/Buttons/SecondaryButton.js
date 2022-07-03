import React from 'react';
import '../../sass/main.scss';

const SecondaryButton = (props) => {
    
   return <div style={props.style} onClick={props.click} className="SecondaryButton"> { props.text } </div>
    
}

export default SecondaryButton;

