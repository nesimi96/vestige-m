import React, { useState } from 'react';
import '../../sass/main.scss';
import { calculateParfumRate } from '../../components/helpFuncs/parfumRate';
import axios from 'axios';
import Star from '../../components/svg/Star';

const ParfumRating = (props) => {


    const [activeStars, setActiveStars] = useState(null);
    const [ratingUpdate, setRatingUpdate] = useState(null);
   
    const parfumData = props.parfumData;

    const starStyle = {
        width: 20,
        height: 20,
        margin: 3,
        cursor: 'pointer',
        fill: 'transparent',
        stroke: 'rgba(0, 0, 0, .85)',
        strokeWidth: '3px',
        transition: 'all .2s ease-in-out',
    }
    const starsData = [1, 2, 3, 4, 5];


    const whenMouseEntered = (currentStar) => {
        setActiveStars(currentStar);
    }

    const whenMouseLeaves = () => {
        setActiveStars(null);
    }

    const rateParfum = (index) => {

        const rateAllowed = isUserEnableToRate()

        if(rateAllowed){
            // Edit old rating in database..
            let copiedParfumData = {...parfumData};
            const databaseKey = copiedParfumData.databaseKey;
            if(!copiedParfumData.rating){
                copiedParfumData.rating = [];
                copiedParfumData.rating.push(index + 1);
            }else {
                copiedParfumData.rating.push(index + 1)
            }
            axios.patch(`https://vestige-2172c.firebaseio.com/perfums/${databaseKey}.json`, copiedParfumData);
    
            setRatingUpdate(true);
            setRatedParfumToLocalStorage(copiedParfumData.articalID);
        }

    }

    const setRatedParfumToLocalStorage = (parfumID) => {
        let arrayOfParfums = [];
         if(JSON.parse(localStorage.getItem("parfumsRated"))){
             arrayOfParfums = [...JSON.parse(localStorage.getItem("parfumsRated")), parfumID];
         }else {
             arrayOfParfums.push(parfumID)
         }

         localStorage.setItem('parfumsRated', JSON.stringify(arrayOfParfums))

    }

    const isUserEnableToRate = () => {

        let rateAllowed = null;
        if(!JSON.parse(localStorage.getItem("parfumsRated"))){
            rateAllowed = true;
        }else {
            const list = JSON.parse(localStorage.getItem("parfumsRated"));
            list.forEach(cur => cur === parfumData.articalID ? rateAllowed = false : rateAllowed = true)
        }

        return rateAllowed;
    } 


    const stars = starsData.map((curStar, index) => {
        return <div key={index} style={{position: 'relative'}}>
            <Star curStar={curStar} activeStars={activeStars}
         mouseEnter={() => whenMouseEntered(curStar)} mouseLeave={() => whenMouseLeaves()}
         click={() => rateParfum(index) }
         style={starStyle} index={index} ratingUpdate={ratingUpdate} />
        </div>
    })


    return <div className="ParfumRating">
               { stars }
               <p style={{
                   fontSize: parfumData.rating ? 22 : 16
               }} > { calculateParfumRate(parfumData.rating) } </p>
           </div>
}

export default ParfumRating;