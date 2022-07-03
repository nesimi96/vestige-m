import React from 'react';
import '../../../sass/main.scss';
import Swipe from 'react-easy-swipe';
import { PriceForUI } from '../../helpFuncs/PriceForUI';

const TopThreeComponent = (props) => {

    const imgStyle = {
        width: '85%',
        height: '90%',
        marginTop: '5%'
    }

    let price = PriceForUI(props.price);

    let currency = props.country !== "BA" ? '€' : 'KM'

    return <div className="TopThreeComponent">
               <div className="TopThreeComponent-image" onClick={() => props.router.history.push(props.route) }>
                     <img  src={require(`../../../assets/images/perfums/${props.img}.png`)}/>
               </div>
               <p className="TopThreeComponent-brand"> {props.brand} 
                     <span>{props.UIname}</span>
                </p>
               <p className="TopThreeComponent-price"> {price} <span> {currency} </span> </p>
           </div>
}

export default TopThreeComponent;
