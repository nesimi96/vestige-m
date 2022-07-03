import React from 'react';
import HeaderBackgroundImg from '../../components/Images/HeaderBackground';
import '../../sass/main.scss';
import PrimaryButton from '../../components/Buttons/PrimaryButton';

const Header = (props) => {

    const router = props.route;

    let link ='/originalni-testeri-55ml/page=1';
    

    let backgroundImg = <HeaderBackgroundImg />
    if(window.innerWidth >= 900) {
        backgroundImg = <img src={require(`../../assets/images/about.jpg`)}/>
    }
    
    return <header className="Header">
               <div className="Header-content">
                   <h1>ORIGINALNI TESTERI</h1>
                   <PrimaryButton text="POGLEDAJ PONUDU" click={() => router.history.push(link)} style={PrimaryButtonStyle}/>
               </div>
               { backgroundImg } 
          </header>
}


export default Header

const PrimaryButtonStyle = () => {
    return `
        position: relative;
        background-color: transparent;
        margin-top: 7%;
        color: #fff;
        font-size: 16px;
        font-family: 'Neutra';
        padding: 12px 33px;
        border: 1px solid #9c8265;
        transition: all .15s ease-in;
        cursor: pointer;

        @media screen and (min-width: 600px) {
            margin-top: 0;
           }
     

        &::before {
            position: absolute;
            top: -9%;
            left: 1%;
            display: block;
            content: "";
            border: 1px solid #9c8265;
            height: 114%;
            width: 97%;
        }

        &:hover {
            background-color: #e4c7a533;
        }
    `
}