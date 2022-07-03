import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Orders from './Orders';

const VestigeOrders = () => {

  const [data, setData] = useState(null);

   useEffect(() => {
      axios.get('https://vestige-2172c.firebaseio.com/orders/.json')
      .then(res => {
          let extract = Object.values(res.data).reverse();
          console.log(extract)
          console.log(res.data)

          extract = extract.slice(0, 500)
          setData(extract)
      })
      .catch(err => console.log(err))
   }, [])

   

   console.log(data)

   let orders = null;
   if(data){
       orders = data.map((cur, ind) => {
           return <Orders key={ind} order={cur} />
       })
   }

    return <div>
                { orders }
            </div>
}

export default VestigeOrders;