import React from 'react';
import '../../../sass/main.scss';
import DesktopNavItem from './DesktopNavItem';

const DesktopNav = (props) => {

    const router = props.route;

    const navItemData = [
        {text: 'Muški', route: '/muški-testeri-55ml/page=1', animeTime: '.5s'},
        {text: 'Ženski', route: '/ženski-testeri-55ml/page=1', animeTime: '.7s'},
        {text: 'O nama', route: '/about', animeTime: '.9s'},
        {text: 'Kontakt', route: 'contact', animeTime: '1.1s'},
    ]

    const items = navItemData.map((curItem, index) => {
        return <DesktopNavItem key={index} route={curItem.route} router={router} text={curItem.text} />
    })

    return <nav className="DesktopNav">
                { items }
            </nav>
}

export default DesktopNav;