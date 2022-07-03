import React from 'react';
import '../../../sass/main.scss';

const DesktopNavItem = (props) => {

    const methods = () => {
        if(props.route === 'contact'){
            window.scrollTo(0,document.body.scrollHeight);
        }else {
            props.router.history.push(props.route);
        }
    }

    return <div onClick={() => methods() }  className="DesktopNav-Item">
                <p>{props.text}</p>
            </div>
}

export default DesktopNavItem;