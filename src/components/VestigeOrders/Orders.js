import React from 'react';

const Orders = (props) => {
    
    const order = props.order;

    console.log(order)

    const parfums = order.cartList.map((cur, ind) => {
        return <p>{cur.parfumData.parfumData.brand} - {cur.parfumData.parfumData.names.UI} | 
        {cur.parfumData.activePrice.ml} -  {cur.parfumData.activePrice.price}</p>
    })

    return <div style={{border: "1px solid black", margin: "10px", textAlign: "center", padding: "20px",
    fontSize: "20px"}}>
        <p>{order.userInfo.name}</p>
        <p>{order.userInfo.adress} {order.userInfo.city}</p>
        <p>{order.userInfo.tel}</p>
        <p>{order.userInfo.email}</p>
        <p>{order.money.total}</p>
        <p>{order.country}</p>
        <p>{order.time.date}, {order.time.time}</p>
        <p>{order.orderID}</p>
        { parfums }
    </div>
}

export default Orders