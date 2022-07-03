import React from 'react';
import '../../sass/main.scss';
import Instagram from '../../components/svg/Instagram';

const ContactItem = (props) => {
    
    let text = props.text;
    if(props.link) text = <a href={props.link} target="_blank"> {props.text} </a>

return <div onClick={() => console.log(props.click)} className="Footer-contact-item">
            <div>{ props.svg }</div>
            <p>
              { text }
            </p>
        </div>
}

export default ContactItem;