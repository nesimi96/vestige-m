import React, { useState } from 'react';
import '../../../../sass/main.scss';

const Controller  = (props) => {

    const articlesData = props.articlesData;

    return <div className="Controller">
                <div className="Controller-option_and_price">
                      <p> {articlesData.controlls[props.index].option } </p>
                      <p> {articlesData.controlls[props.index].price.normalPrice.toFixed(2)}KM </p>
                </div>
                <div className="Controller-controlling">
                    <div onClick={() => props.changeQuanity('inc', props.index) } className="Controller-controlling-wrapper">
                         &#43;
                    </div>
                     <p style={{margin: '0 10px'}}>{ props.quanity[props.index].quanity }</p>
                    <div onClick={() => props.changeQuanity('dec', props.index) } className="Controller-controlling-wrapper">
                         &#45;
                    </div>
                </div>
            </div>
}

export default Controller