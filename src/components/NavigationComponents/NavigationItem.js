import React from 'react';
import '../../sass/main.scss';

const NavigationItem = (props) => {
    
    const methods = () => {
        if(props.route === 'contact'){
            window.scrollTo(0,document.body.scrollHeight);
        }else {
            props.router.history.push(props.route);
        }
        props.closeNavigation();
    }

    return <div onClick={() => methods()} style={{
        animation: `item-enter ${props.animeTime} ease-in`
    }} className="Navigation-itemWrapper-item"> { props.text } </div>
}

export default NavigationItem