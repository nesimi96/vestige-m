import React from 'react';
import '../../sass/main.scss';
import { PriceForUI } from '../../components/helpFuncs/PriceForUI';
import SecondaryButton from '../../components/Buttons/SecondaryButton';

const CartTotal = (props) => {

    const country = localStorage.getItem('country');;

    let summary = null;
     if(props.calculateSummary){
         summary = PriceForUI(`${props.calculateSummary}`);
        }else {
            summary = '0'
        }
        
     let discountAlert = null;
        if(props.promoDiscount) discountAlert = <p style={{
            lineHeight: 0, color: 'rgba(0, 0, 0, .95)', fontSize: 13,
            position: 'absolute', bottom: '-10.5px', left: 0
        }}>Popust od {props.promoDiscount}% je uracunat u konacnu cijenu</p>

    // CURRENCY VALUE..
    let currency = country !== "BA" ? '€' : 'KM';

    let shipping = country !== "BA" ? '3.00' : '6.00';

     const calculateTotal = props.totalWithPromo ? props.totalWithPromo : props.calculateSummary + (country !== "BA" ? 300 : 600);
     let total = PriceForUI(`${calculateTotal}`)
     if(total === 'N.aN') total = shipping

    return <div className="Cart-Total">
                <div className="Cart-Total-prices">
                     <div className="Cart-Total-prices__money">
                         <div className="Cart-Total-prices__money-first">Narudžba</div>
                         <div className="Cart-Total-prices__money-second"> { summary } { currency } </div>
                     </div>
                     <div className="Cart-Total-prices__delivery">
                         <div className="Cart-Total-prices__delivery-first">Dostava</div>
                         <div className="Cart-Total-prices__delivery-second"> { shipping } { currency } </div>
                     </div>
                </div>
                <div className="Cart-Total-total" style={{borderBottom: props.from === 'CheckoutSummary' ?
                'none' : 'border-bottom: .35px solid rgb(189, 189, 189)' }}>
                     <div className="Cart-Total-total-first"> UKUPNO: </div>
                     <div className="Cart-Total-total-second"> { total } { currency } </div>
                     { discountAlert }
                </div>
                { props.from === 'CheckoutSummary' ? null :
                <div className="Cart-Total-proceed">
                        <SecondaryButton click={() => window.location.href="/checkout"} style={{
                            fontSize: 15,
                            letterSpacing: 1.5,
                        }} text="NASTAVI" />
                </div> }
           </div>
}

export default CartTotal;

