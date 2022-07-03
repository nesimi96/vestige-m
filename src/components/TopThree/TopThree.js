import React, { useEffect, useState, useMemo } from 'react';
import '../../sass/main.scss';
import TopThreeComponent from './TopThreeComponent/TopThreeComponent';
import { srbParfumData } from '../../data/srbParfumData';
import axios from 'axios';
import ReactSwipe from 'react-swipe';

const TopThree = (props) => {

    const [parfumData, setParfumData] = useState(null);
    const [elementPosition, setElementPostion] = useState(0);
    const [country, setCountry] = useState(null)

    const cntry = localStorage.getItem('country')

    useEffect(() => {

        setCountry(cntry)
        const countryData = country !== "BA" ? 'perfums' : 'serbiaPerfums';
        
        axios.get(`https://vestige-2172c.firebaseio.com/${countryData}.json`)
        .then(res => {
            const extractedData = Object.values(res.data);
            const sortedByBought = extractedData.sort((a, b) => a.bought - b.bought).reverse();
            const onlyThree = onlyParfumsAreThere(sortedByBought);
            setParfumData(onlyThree);
        })
        .catch(error => console.log(error))
      
      }, [cntry])
    
      
    const onlyParfumsAreThere = (data) => {
        
        const threeParfums = [];
        data.forEach((cur, ind) => {
            if(cur.price.medium.price != '0') {
                threeParfums.push(cur);
            }
        })

        return threeParfums.slice(0, 3)
    }

    let componentRoute = null;

    let content = null;
    if(parfumData){
        content = parfumData.map((cur, ind) => {
            return <div key={ind} style={{
                marginTop: props.notTopThree ? 20 : null
            }} className="TopThree-Slider">
                        <TopThreeComponent country={country} key={ind} router={props.route}
                        brand={cur.brand} img={cur.names.img} route={cur.names.route}
                        UIname={cur.names.UI} price={cur.price.medium.discount}/>
                    </div>
         })
    }
    
    const startSlide = 0;
    const swipeOptions = {
        startSlide: parfumData ? startSlide < parfumData.length && startSlide >= 0 ? startSlide : 0 : null,
        auto: 0,
        speed: 500,
        disableScroll: false,
        continuous: false,
    };

    const style = { marginTop: props.notTopThree ? 35 : null }


    let scrollable =  <ReactSwipe ref={reactSwipe => (reactSwipe = reactSwipe)} swipeOptions={swipeOptions}>
                        { content }
                    </ReactSwipe>

    let notScrollable
    if(window.innerWidth > 650 && parfumData){
        notScrollable = parfumData.map((cur, ind) => {
           return <TopThreeComponent country={country} key={ind} router={props.route}
           brand={cur.brand} img={cur.names.img} route={cur.names.route}
           UIname={cur.names.UI} price={cur.price.medium.discount}/>
       })
    }

    return <div style={style} className="TopThree">
               <h1> NAJPRODAVANIJI - TOP 3 </h1>
               <div className="TopThree-nonScrollable">
                  { window.innerWidth > 650 ? notScrollable : scrollable }
               </div>
           </div>

}

export default TopThree;
