import React from 'react';
import '../../sass/main.scss';

const CartHeader = (props) => {

    return <div className="Cart-CartHeader">
               <div className="Cart-CartHeader-header">
                    MOJA KORPA
               </div>
               <div onClick={props.cartClose} className="Cart-CartHeader-close">
                    &#10005;
               </div>
           </div>
}

export default CartHeader