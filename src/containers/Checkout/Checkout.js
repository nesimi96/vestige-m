import React, { useState, useEffect, useMemo } from 'react';
import '../../sass/main.scss';
import Info from '../../containers/Info/Info';
import Form from './Form';
import CheckoutSummary from './CheckoutSummary';
import { connect } from 'react-redux';
import { calcTotal } from '../../components/helpFuncs/calcTotal';
import { srbParfumData } from '../../data/srbParfumData';
import axios from 'axios';
import PromoCode from '../../components/CheckoutComponents/PromoCode';

const Checkout = (props) => {

    let [parfums, setParfums] = useState(null);
    let [parfumKeys, setParfumkeys] = useState(null);
    let [promoCodes, setpromoCodes] = useState(null);
    let [promoTyped, setPromoTyped] = useState(0);
    let [promoDiscount, setPromoDiscount] = useState(0);
    let [emails, setEmails] = useState(null);
    let [emailKeys, setEmailKeys] = useState(null);

    const country = localStorage.getItem('country')
    
    useEffect(() => {
       // get promo codes
       axios.get('https://vestige-2172c.firebaseio.com/promo.json')
       .then(res => {
           const extract = Object.values(res.data)[0]
           setpromoCodes(extract);
       })
       .catch(error => console.log(error))

       axios.get('https://vestige-2172c.firebaseio.com/emails.json')
       .then(res => {
           const extract = Object.values(res.data);
           const emailKeys = Object.keys(res.data);
           setEmails(extract);
           setEmailKeys(emailKeys);
       })
       .catch(error => console.log(error))

       //get all pafums 
       axios.get('https://vestige-2172c.firebaseio.com/perfums.json')
       .then(res => {
          const extract = Object.values(res.data);
          const parfumKeys = Object.keys(res.data);

          const countryData = country !== "BA" ? srbParfumData() : extract

          setParfums(countryData);
          setParfumkeys(parfumKeys);
       })
       .catch(error => alert(error))
    }, [])

    const cartList = props.cartsList;

    // What user typed in promo input
    const typePromoCode = (e) => setPromoTyped(e.target.value);
    
    // check promo valid
    const checkPromoValidation = () => {
        if(promoCodes) promoCodes.forEach(cur => cur === promoTyped ? setPromoDiscount(promoDiscount + 10) : null)
    }

    // Calculate summary function
    const calculateSummary = () => {
        let sum = null;
        if(cartList){
            return sum = cartList.reduce((ACC, CUR) => { return +ACC + +CUR.price.price }, 0);
        }
   }

   const shipping = country === "RS" ? 300 : 600;

   // Total. Calculate everything no matter promo code is there or not
   let totalWithPromo = calcTotal(calculateSummary(), shipping, promoDiscount);

    // SEND ORDER
    const sendOrder = (email, userData) => {

        let orderID = null;
        if(!orderID) orderID = Math.floor(Math.random() * 10000000)
        
        const data = {
            userInfo: {
                name: userData[0].val,
                adress: userData[1].val,
                city: userData[2].val,
                tel: userData[3].val,
                email: email.val
            },
            country: country,
            time: currentTime(),
            cartList: cartList,
            money: {
                parfums: calculateSummary(),
                total: totalWithPromo,
            },
            orderID: orderID,
        }

        // Send order to data base
        axios.post('https://vestige-2172c.firebaseio.com/orders.json', data)
        .then(res => {
            axios.post('https://vestige-2172c.firebaseio.com/emaildiscount.json', {email: data.userInfo.email})
            .then(() => {
                localStorage.setItem('orderID', orderID);
                window.location.href="/order-summary"
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error));

        // Change bought propery from database
        if(parfums && parfumKeys && country !== "RS") changeBoughtOfParfum();
            
    }

    const changeBoughtOfParfum = () => {
     
            const copiedParfums = [...parfums];
            const copedKeys = [...parfumKeys];

            
         if(cartList){
            cartList.forEach((curParfum, index) => {
                const cartArticalID = curParfum.parfumData.parfumData.articalID;
                copiedParfums.forEach((curCopy, copyIndex) => {
                    if(cartArticalID === curCopy.articalID){
                        const key = copedKeys[copyIndex];
                        curCopy.bought += 1;
                        axios.patch(`https://vestige-2172c.firebaseio.com/perfums/${key}.json`, curCopy)
                    }
                })
 
            } )
         }
        
    }

    const currentTime = () => {
        var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        const splited = utc.split('/').reverse();
        const date = splited.join('.')

        const times = new Date();
        let h = times.getHours();
        let m = times.getMinutes();
        let s = times.getSeconds();
        let time = h + ':' + m + ':' + s

        const currentTime = {
            date: date,
            time: time,
        }

        return currentTime;

    }

    currentTime();

    return <div className="Checkout">
               <CheckoutSummary country={country} sendOrder={sendOrder} cartList={cartList}
               promoDiscount={promoDiscount} setPromoDiscount={setPromoDiscount} calculateSummary={calculateSummary}
               checkPromoValidation={checkPromoValidation} typePromoCode={typePromoCode} totalWithPromo={totalWithPromo} />
               <h1>Ispunite formu</h1>
               <Form sendOrder={sendOrder} cartList={cartList}/>
           </div>
}

const mapStateToProps = state => {
    return {
        cartsList: state.cartList
    }
}

export default connect(mapStateToProps)(Checkout);