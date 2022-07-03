import React, { useEffect, useState } from 'react';
import Layout from '../containers/Layout/Layout';
import ImageAndNameParfum from '../components/ParfumComps/ImageAndNameParfum';
import ParfumQuanityAndPrice from '../components/ParfumComps/ParfumQuanityAndPrice';
import ArticalInfo from '../components/ParfumComps/ArticalInfo'; 
import TopThree from '../components/TopThree/TopThree';
import Brands from '../components/Brands/Brands';
import Loader from '../components/Loader/Loader';
import { useParams } from "react-router-dom";
import { srbParfumData } from '../data/srbParfumData';
import '../sass/main.scss';
import axios from 'axios';
import { connect } from 'react-redux';
import * as action from '../store/actions/index';

const Perfum = (props) => {

    const [parfumData, setParfumData] = useState('');
    const [price, setPrice] = useState('');
    const [activePrice, setActivePrice] = useState('');
    const [country, setCountry] = useState(null)

    
    useEffect(() => {
        const cntry = localStorage.getItem('country')
        setCountry(cntry)
        window.scrollTo(0, 0);
        
        // IF user is located from another country, fetch data for that country...
        const countryData = cntry !== "BA" ? 'serbiaPerfums' : 'perfums';
        console.log(countryData)

        axios.get(`https://vestige-2172c.firebaseio.com/${countryData}.json`)
        .then(res => {
            const extractData = Object.values(res.data);
            const extractKeys = Object.keys(res.data)

            
            extractData.forEach((curParfum, index) => {
                if(curParfum.names.route === router){
                    const copiedPrice = {...curParfum.price};
                    curParfum.databaseKey = extractKeys[index];
                    copiedPrice.big = {...copiedPrice.big, pcs: 1, active: true};
                    copiedPrice.medium = {...copiedPrice.medium, pcs: 0, active: null};
                    setParfumData(curParfum);
                    setPrice( copiedPrice );


                    // Set initial active price
                    let initialPrices = null;
                    if(copiedPrice.big.price != 0){
                        initialPrices = { price: copiedPrice.big.price, ml: copiedPrice.big.ml, discount: copiedPrice.big.discount  }
                    }else if(copiedPrice.medium.price != 0){
                        initialPrices = { price: copiedPrice.medium.price, ml: copiedPrice.medium.ml, discount: copiedPrice.medium.discount  }
                    }
                     setActivePrice( initialPrices )
                }
                  
            })
        })
        .catch(error => console.log(error))
      }, [props.route.location.pathname])
    
    let router = props.route.location.pathname;
  
    /*// When component mounts, we parfums and choose one parfum for rendering..
    useEffect(() => {
       
    }, [props.route.location.pathname])*/

    const adjustActivePrice = (type) => {
        if(type === 'big'){
            price.big.active = true;
            price.medium.active = null;
            setActivePrice({ price: price.big.price, ml: price.big.ml, discount: price.big.discount })
        }else if(type === 'medium'){
            price.medium.active = true;
            price.big.active = null;
            setActivePrice({ price: price.medium.price, ml: price.medium.ml, discount: price.medium.discount })
        }
    }

    const notes = parfumData.notes;

    const articalsData = [{description: 'OPIS ARTIKLA', list: ['- Originalan testni parfem', '- Originalno pakovanje tester parfema',
    '- Šifre i barkodovi proizvođača utisnuti na testerima', 
    '- Vestige se trudi da opisi, slike i cijene proizvoda budu kompletne i bez greške. U slučaju grešaka pri prikazu informacija ne preuzimamo odgovornost.',
     `- Šifra artikla: ${parfumData.articalID}`]},
    {description: 'OPIS PARFEMA', list: [parfumData.description]},
    {description: 'NOTE', list: notes},
    {description: 'DETALJI OKO NARUDŽBE', list: ['Nakon što ste dodali artikal u korpu, pritistene gumb "NASTAVI NARUDŽBU", zatim popunite podatke koji su nam potrebni kako bismo vam poslali artikal.', 'Nakon što mi zaprimimo narudžbu, šaljemo vam taj isti dan ako je to moguće ili u najgorem slučaju sljedeći dan. Vrijeme dostave je 24h, ne odgovaramo ako dostava kasni zbog razloga na koje mi ne možemo uticati.', 'Moguće je otvoriti paket prije preuzimanja. Ukoliko bude nekih nepravilnosti sa artiklom(oštećenja itd...) slobodni ste da odmah vratite artikal i mi to pozdravljamo.']},
    
]

    let articals = null;
    if(parfumData) {
        articals = articalsData.map((curArt, index) => {
           return <ArticalInfo key={index} list={curArt.list} description={curArt.description} />
       })
    }

    let finalPrice = null;
    const copiedPrices = { ...activePrice }
    if(activePrice.discount != 0){
        copiedPrices.price = activePrice.discount;
        finalPrice =  copiedPrices;
    }else {
        finalPrice = activePrice;
    }

    const cartItem = {
        activePrice: finalPrice,
        parfumData: parfumData
    }

   const multipleMethods = () => {
        props.addItemToLocalStorage(cartItem);
        props.updateCart();
    }

    let parfumPreview = null;
    parfumPreview = parfumData ? <div className="Parfum" >
                                        <div className="Parfum-mainWrapper">
                                            <ImageAndNameParfum parfumData={parfumData} />
                                        <ParfumQuanityAndPrice country={country} parfumData={parfumData} toLocalStorage={() => multipleMethods()} 
                                        adjustActivePrice={adjustActivePrice}  price={price}
activePrice={activePrice.price} activeDiscount={activePrice.discount} buttonStyle={() => buttonStyle() } />
                                        </div>
                                        <div className="ArticalHolder">
                                            { articals }
                                        </div>
                                        <TopThree notTopThree={true} route={props.route} />
                                        <Brands />
                                </div> : <div style={{height: '100vh', position: 'relative'}} > <Loader /> </div>;



     
                                

    return parfumPreview
           
}

const mapDispatchToProps = dispatch => ({
    addItemToLocalStorage: (cartObj) => dispatch(action.itemToLocalStorage(cartObj)),
    updateCart: () => dispatch(action.updateCart())
})

export default connect(null, mapDispatchToProps)(Perfum)

const buttonStyle = () => {
  
    return `

        // changed
        align-self: center;
        padding: 12px 40px;
        font-size: 16px;
        margin-bottom: 45px;

        position: relative;
        background-color: transparent;
        margin-top: 7%;
        color: #9c8265;
        font-family: 'Neutra';
        border: 1px solid #9c8265;
        transition: all .15s ease-in;

        @media screen and (min-width: 650px) {
            grid-column: 5 / span 3;
            grid-row: 7 / span 1;
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

