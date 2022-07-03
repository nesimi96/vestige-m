import React from 'react';
import '../../../../sass/main.scss';
import * as actionType from '../../../../store/actions/actionTypes';
import * as action from '../../../../store/actions/actions';

const ChooseBox = (props) => {

    const methods = (cur) => {
        props.setAlertOpened(null);
        props.setCountry(actionType.SET_COUNTRY, cur)
        localStorage.setItem('country', cur)
        action.updateCart()
        action.addToCart()
    }

    const flagsData = [
        {img: 'bosnia-flag', code: 'BA'},
        {img: 'serbia-flag', code: 'RS'},
    ]

    const flags = flagsData.map((cur, ind) => {
 
           return  <div>
                        <div key={ind} className="Choose-Flag-imgHolder">
                            <img  src={require(`../../../../assets/images/${cur.img}.png`)}/>
                        </div>
                        <button className="CountryButton" onClick={() => methods(cur.code)} >IZABERI</button>
                    </div>
    })

    return <div className="Choose">
                <h3>Molimo izaberite državu iz koje poručujete kako bi naš web-shop znao kakvu ponudu da izlista.</h3>
                <h3>Šaljemo iz distributivnog centra u državi iz koje ste poručili.</h3>
                <div className="Choose-Flag">
                    { flags }
                </div>
                <p>www.vestige.ba</p>
            </div>
}

export default ChooseBox;