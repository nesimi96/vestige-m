import React, { useEffect, useState } from 'react';
import { PriceForUI } from '../../components/helpFuncs/PriceForUI';
import '../../sass/main.scss';
import axios from 'axios';

const OrderSummary = () => {


    const [order, setOrder] = useState(null);

    let country = localStorage.getItem('country')

    useEffect(() => {
      axios.get('https://vestige-2172c.firebaseio.com/orders.json')
      .then(res => {
          const orderID = localStorage.getItem('orderID')
          console.log(orderID);
          const extractData = Object.values(res.data);
              let userOrder = extractData.find(curOrder => curOrder.orderID === +orderID)
              setOrder(userOrder);
              setTimeout(() => { localStorage.clear() }, 3000)
      })
      .catch(error => console.log(error))
    }, [])

    let currency = country !== "BA" ? '€' : 'KM'

    let orderSummary = null;
    if(order){
        orderSummary = order.cartList.map((order, orderInd) => {
        const price = PriceForUI(order.price.price);
        return <div className="Order-summary">
                        <p className="Order-summary-articalName">{order.parfumData.parfumData.brand} {order.parfumData.parfumData.names.UI} {order.price.ml} </p>
        <p className="Order-summary-price">{price} {currency} </p>
                </div>
        })
    }

    return <div className="OrderSummary">
                  {order ? <div>
                              <h3>Hvala na narudžbi!</h3>
                              <h5>Vaša narudžba je zaprimljena i bit će poslata sljedeći dan od narudžbe.</h5>

                              <h5>Napomena! Naš sajt koristi Google Geolokaciju koja trenutno ima tehničkih problema i radi toga ćemo imati problema da odredimo vašu lokaciju. Uslijed toga na računu će Vam možda pisati
                                  cifre u valutama iz drugih država, ali će Vam na kraju biti naplaćeno onako kako stoji u korpi. Hvala na razumijevanju.

                              </h5>
                              <div className="Order">
                                   { orderSummary }
                                   <div className="Order-total">
                                       <p className="Order-total-total-word">Ukupno:</p>
                                       <p className="Order-total-price"> {PriceForUI(`${order.money.total}`)} {currency} </p>
                                   </div>
                              </div>
                              <p className="totalPriceAlert">U ukupan iznos uračunata dostava koja iznosi: <b> { country !== "BA" ? '3.00' : '6.00' } {currency}</b>, kao i promo vaučer ako je on postojan.</p>
                              <p className="parasID">Šifra narudžbe: {order.orderID}</p>
                              <p className="parasID">Datum i vrijeme: {order.time.date} - {order.time.time}</p>
                              <h5 className="Advice">Savjetujemo vam da uslikate ili zapišete <b>"Šifru Narudžbe"</b> kako bi mogli pronaći vašu narudžbu ukoliko dođe do nekih problema.</h5>
                             
                           </div> : <h3>Loading...</h3>}
            </div>

}

export default OrderSummary;