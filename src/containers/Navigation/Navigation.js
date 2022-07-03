import React from 'react';
import '../../sass/main.scss';
import NavigationItem from '../../components/NavigationComponents/NavigationItem';
import Copyright from '../../components/Copyright/Copyright';
import { Transition } from 'react-transition-group';

const Navigation = (props) => {
    
    const route = props.route;

    const navItemData = [
        {text: 'Muški testeri', route: '/muški-testeri-55/page=1', animeTime: '.5s'},
        {text: 'Ženski testeri', route: '/ženski-testeri-55/page=2', animeTime: '.7s'},
        {text: 'O nama', route: '/about', animeTime: '.9s'},
        {text: 'Kontakt', route: 'contact', animeTime: '1.1s'},
        {text: 'Pitanja (faq)', route: '/faq', animeTime: '1.1s'},
    ]

    const items = navItemData.map((curItem, index) => {
           return <NavigationItem closeNavigation={props.closeNavigation} route={curItem.route} router={route} 
           animeTime={curItem.animeTime} key={index} text={curItem.text} />
    }) 


    return <Transition in={props.navOpen} timeout={350} mountOnEnter unmountOnExit>
           {state => (
          <div style={{
              animation: state === 'entering' || state === 'entered' ? 'navigation-enter .35s ease-in-out' :  
              state === 'exiting' || state === 'exited' ?  'navigation-close .35s ease-in-out' :  '',
          }} className="Navigation">
                <div className="Navigation-navWrapper">
                    <div onClick={props.closeNavigation} className="Navigation-close">
                         <div style={{
                             animation: state === 'entering' || state === 'entered' ? 'close-enter .5s ease-in-out' : '',
                         }}>
                             &#10005;
                         </div>
                    </div>
                    <div className="Navigation-itemWrapper">
                        { items }
                    </div>
                    <div className="Navigation-copyright">
                        <Copyright />
                    </div>
                </div>
           </div>

           )}
           </Transition>

}

export default Navigation;