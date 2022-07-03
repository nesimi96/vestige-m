import React from 'react';

const InfoItem = (props) => {
return <div className="Info-Item">
           {props.icon}
           <p>{props.text}</p>
       </div>
}

export default InfoItem;