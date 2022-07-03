import React from 'react';
import '../../sass/main.scss';
import CartItem from './CartItem';

const CartSummary = (props) => {

    const cartList = props.cartList;
    const country = props.country;
        
    let cartItem = null;
    if(cartList){
         cartItem = cartList.map((curItem, ind) => {
            return <CartItem country={country} deleteItem={props.deleteItem} index={ind} cartList={curItem} key={ind} />
        })
    }

    return <div className="Cart-CartSummary">
        { cartItem }
    </div>
}

export default CartSummary;