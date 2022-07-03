import React from 'react';
import { PriceForUI } from '../../components/helpFuncs/PriceForUI';
import '../../sass/main.scss';

const CartItem = (props) => {
     
    const cartList = props.cartList;
    const country = localStorage.getItem('country');
    
    const nameUI = cartList.parfumData.parfumData.names.UI;
    let { price, ml } = cartList.price;

    let convertedPrice = PriceForUI(price);

    const imgUrl = cartList.parfumData.parfumData.names.img;
    
    return <div className="CartItem">
               <div className="CartItem-imgHolder">
                    <img  src={require(`../../assets/images/perfums/${imgUrl}.png`)}/>
               </div>
               <div className="CartItem-description">
                    <p> { nameUI } <span> { ml } </span></p>
                    {props.from === 'CheckoutSummary' ? null : 
                    <div onClick={() => props.deleteItem(props.index)} > &#10005; Ukloni </div> }
               </div>
               <div className="CartItem-price">
                    { convertedPrice } {country !== "BA" ? '€' : 'KM'}
               </div>
            </div>
}

export default CartItem