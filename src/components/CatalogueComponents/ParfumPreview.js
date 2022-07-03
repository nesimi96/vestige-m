import React from 'react';
import '../../sass/main.scss';
import { PriceForUI } from '../../components/helpFuncs/PriceForUI';
import ThirdButton from '../../components/Buttons/ThirdButton';

const ParfumPreviw = (props) => {

    const img = props.img;
    let whichPrice = props.price;
    let price = PriceForUI(props.price, props.country)
    const btnStyle = { fontSize: 11, letterSpacing: .8 }

    const router = props.router;
    const redirectToParfum = (route) => {
        router.history.push(`${route}`);
    }

         
    const cartItem = {
        activePrice: {price: props.price, ml: props.parfCategory, discount: "0"},
        parfumData: props.parfum
    }

    const cartButtonMethods = () => {
        props.updateCart();
        props.addToLocalStorage(cartItem);
    }

    let currency = 'KM';
    if(props.country !== "BA") currency = '€'    

    return <div className="ParfumPreview">
               <div className="ParfumPreview-discount">
                    -30%
                </div>
               <div className="ParfumPreview-image">
                   <img src={require(`../../assets/images/perfums/${img}.png`)} />
               </div>
               <p className="ParfumPreview-brand">{ props.brand}</p>
               <p className="ParfumPreview-name"> {props.nameUI} </p>
               <h3 className="ParfumPreview-price"> { price } {currency} </h3>
               <div className="ParfumPreview-buttons">
                   <ThirdButton click={() => redirectToParfum(props.route)} style={btnStyle} text="PREGLED" />
                   <ThirdButton click={() => cartButtonMethods()} style={btnStyle} text="KUPI" />
               </div>
           </div>
}

export default ParfumPreviw;