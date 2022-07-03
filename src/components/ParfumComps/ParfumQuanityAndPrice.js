import React from 'react';
import '../../sass/main.scss';
import PrimaryButton from '../Buttons/PrimaryButton';
import { PriceForUI } from '../../components/helpFuncs/PriceForUI';
import ParfumRating from './ParfumRating';

const ParfumQuanityAndPrice = (props) => {

    const price = props.price;
    const country = props.country;

    let currency = country !== "BA" ? '€' : 'KM';
    
    let activePrice = null;
    if(props.activePrice){
        activePrice = PriceForUI(props.activePrice);
    }
    
    // *** Style if discount is there *** ///
    const discountStyle = { position: 'absolute', top: -25, left: 0, fontSize: 16.5, color: '#333',
     textDecoration: 'line-through', fontStyle: 'italic', fontWeight: '300' }
    
    // ** DISCOUNT ** //
    let discountBox = null;
    let discount = null;
    if(props.activeDiscount && props.activeDiscount !== '0') {
        discount = PriceForUI(props.activeDiscount);
        discountBox = <span style={ discountStyle } > {activePrice} {currency} </span>
    }
 
    let parfumQuanity = null;
    if(price){

        console.log(price)

        parfumQuanity = <div className="ParfumQuanity">
                                <div className="ParfumQuanity-quanity">

                                { price.big.price != 0 ? <div onClick={() => props.adjustActivePrice('big')} style={{
           border: price.big.active ? '1.5px solid #9c8265' : '.2px solid rgba(0, 0, 0, .2)',
           boxShadow: price.big.active ? '0 1px 6px 0 rgba(32,33,36,0.1)' : 'none'
                                    }} > {price.big.ml} </div> : null }

                                { price.medium.price != 0 ? <div onClick={() => props.adjustActivePrice('medium')} style={{
           border: price.medium.active ? '1.5px solid #9c8265' : '.2px solid rgba(0, 0, 0, .2)',
           boxShadow: price.medium.active ? '0 1px 6px 0 rgba(32,33,36,0.1)' : 'none'
                                    }}> {price.medium.ml} </div> : null }


                                </div>
                                <div className="ParfumQuanity-price">
                                    <span> {discount ? discount : activePrice } </span> {currency}
                                    { discountBox }
                                </div>
                        </div>
    }

       return <>
                 { parfumQuanity }
                <PrimaryButton click={() => props.toLocalStorage()} text="DODAJ U KORPU" style={props.buttonStyle}/>
                 <ParfumRating parfumData={props.parfumData} />
                <div className="Parfum-bottom-line"></div>
             </>
}

export default ParfumQuanityAndPrice;

