import React, { useState, useMemo, useEffect } from 'react';
import '../../../sass/main.scss';
import Instagram from '../../svg/Instagram';
import AlertBosnia from './alertBosnia';
import AlertSerbia from './alertSerbia';
import axios from 'axios';

const Alert = () => {

    const [alert, setAlert] = useState(true)
    const [country, setCountry] = useState(null)

    useMemo(() => {
      setCountry(localStorage.getItem('country'));
    }, [localStorage.getItem('country')])

    const countryAlert = country !== "BA" ? <AlertSerbia /> : <AlertBosnia />
     
    if(!alert) return null

    const iconStyle = {
        fill: 'black',
        height: 20,
        width: 20,
        marginRight: 30,
        cursor: 'pointer',
        animation: 'pulsating .5s ease-in-out infinite'
    }
   
    return <div className="Alert">
               <div className="Alert-content">
                     { countryAlert }
                    <button onClick={() => setAlert(null)} className="AlertButton">ZATVORI</button>
               </div>
           </div>
}

export default Alert;