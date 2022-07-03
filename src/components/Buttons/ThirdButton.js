import React from 'react';
import '../../sass/main.scss';

const ThirdButton = (props) => {

   const methods = () => {
       props.click();
   }
    
   return <div style={props.style} onClick={() => methods()} className="ThirdButton"> { props.text } </div>
    
}

export default ThirdButton;
