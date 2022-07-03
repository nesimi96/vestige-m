import React from 'react';
import '../../sass/main.scss';
import Copyright from '../../components/Copyright/Copyright';
import ContactItem from '../../components/FooterComponents/ContactItem';
import Instagram from '../../components/svg/Instagram';
import Location from '../../components/svg/Location';
import Phone from '../../components/svg/Phone';
import Facebook from '../../components/svg/Facebook';
import Mail from '../../components/svg/Mail';

const Footer = (props) => {

    const router = props.route;

    const iconStyle = { fill: '#e4c7a5', width: 13.5, height: 13.5 }
 
    const contactData = [
        {text: '+387 61 990 129', svg: <Phone style={iconStyle}/>, },
        {text: '+381 64 9539 139', svg: <Phone style={iconStyle}/>, },
        {text: 'INSTAGRAM/VESTIGE.BA', svg: <Instagram style={iconStyle}/> , 
    link: "https://www.instagram.com/vestige.ba/"},
        {text: 'VESTIGETESTERI@GMAIL.COM', svg: <Mail style={iconStyle}/>},
        {text: '71000 SARAJEVO', svg: <Location style={iconStyle}/>},
    ]

    const contactItems = contactData.map((curContact, index) => {
        return <ContactItem link={curContact.link} key={index} text={curContact.text} svg={curContact.svg} style={curContact.style} />
    })

    const pagesData = [
        {text: 'originalni testeri', route: '/originalni-testeri-55ml/page=1'},
        {text: 'muški testeri', route: '/muški-testeri-55ml/page=1'},
        {text: 'ženski testeri', route: '/ženski-testeri-55ml/page=1'},
        {text: 'o nama', route: '/about'},
    ]

    const pages = pagesData.map((curPage, index) => {
        return <p key={index} onClick={() => window.location.href=`${curPage.route}`} target="_blank"> {curPage.text} </p>
    })

    return <footer className="Footer">
                <div className="Footer-contact">
                    <p style={{color: '#fff'}}>Kontakt:</p>
                      { contactItems }
                </div>
                <div className="Footer-pages"> 
                      { pages }
                </div>
                <div className="Footer-logo">
                     <img  src={require(`../../assets/images/logo.png`)}/>
                </div>
           </footer>
}

export default Footer;