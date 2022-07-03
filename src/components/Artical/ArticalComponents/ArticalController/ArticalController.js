import React, { useState, useMemo } from 'react';
import '../../../../sass/main.scss';
import Controller from './Controller';

const ArticalController = (props) => {

    const articlesData = props.articlesData;
    console.log(articlesData.controlls)
    
    const quanityObj = articlesData.controlls.map(cur => {
        return {quanity: 0}
    })

    const [quanity, setQuanity] = useState(quanityObj);
    const [totalRes, setTotalRes] = useState(0);
    
    const changeQuanity = (type, index) => {
        const copy = [...quanity];
        if(type === 'dec' && copy[index].quanity === 0) return null
        copy[index].quanity = type === 'inc' ? copy[index].quanity + 1 : copy[index].quanity - 1
        setQuanity(copy)
    }

    const calcTotal = () => {
        const controlls = articlesData.controlls;
        let red = [];

        for(let i = 0; i < controlls.length; i++){
            red.push(controlls[i].price.normalPrice * quanity[i].quanity);
        }
        
        let counter = 0;
        red.forEach((cur, ind) => counter = counter + cur)
        setTotalRes(counter)
    }

    useMemo(() => {
       calcTotal()
    }, [quanity])
 
    const controllers = articlesData.controlls.map((cur, ind) => {
        return <Controller key={ind} articlesData={articlesData} index={ind} quanity={quanity}
         changeQuanity={changeQuanity} />
    })

    return <div className="ArticalController">
                <h3> {articlesData.UIname} </h3>
                <div className="ArticalController-controller">
                    { controllers }
                </div>
                <h3>Ukupno: {totalRes.toFixed(2)} KM </h3>
                <button onClick={() => props.addToCart()} >Add to Cart</button>
            </div>
}

export default ArticalController