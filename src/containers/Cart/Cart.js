import React, { useState, useEffect } from 'react';
import '../../sass/main.scss';
import CartHeader from '../../components/CartComponents/CartHeader';
import CartTotal from '../../components/CartComponents/CartTotal';
import CartSummary from '../../components/CartComponents/CartSummary';
import * as action from '../../store/actions/index';
import * as actionTypes from '../../store/actions/actionTypes';
import { connect } from 'react-redux';
import { calcTotal } from '../../components/helpFuncs/calcTotal';
import { Transition } from 'react-transition-group';

const Cart = (props) => {
     
     const [cartList, setCartList] = useState(null);

     let country = localStorage.getItem('country')

      useEffect(() => {
          setCartList(props.cartList);
      }, [props.cartList])

     const calculateSummary = () => {
          let sum = null;
          if(cartList){
              return sum = cartList.reduce((ACC, CUR) => { return +ACC + +CUR.price.price }, 0);
          }
     }
     
     const deleteItemFromCart = (index) => {

       // delete from localStorage
       const listFromLS = [...JSON.parse(localStorage.getItem("cartItem"))];
       listFromLS.splice(index, 1);
       localStorage.setItem('cartItem', JSON.stringify(listFromLS))

       // UPDATE GLOBAL STATES
       props.setCartList();
       props.updateCart();
       
     }

     const totalMoney = calcTotal(calculateSummary(), 600);

     return <Transition in={props.cartOpen} timeout={350} mountOnEnter unmountOnExit >
          {state => (
               <div style={{
                padding: state === 'entered' ? '0 18px' : state === 'exiting' ? '0 0' : '',
                width: state === 'entered' ? '100%' : '0',
                animation: state === 'entering' ? 'cartOpening .35s cubic-bezier(.45,.48,0,.97)' : 
                state === 'exiting' ? 'cartClosing .35s cubic-bezier(.45,.48,0,.97)' : ''
               }} className="Cart">
                    <div style={{
                         display: state === 'entering' || state === 'entered' ? 'block' : 'none',
                         animation: state === 'entering' || state === 'entered' ? 'wrapperOpening .25s linear' : 
                         state === 'exiting' || state === 'exited' ? 'wrapperClosing .15s linear' : ''
                    }} className="Cart-Wrapper">
                         <CartHeader cartClose={() => props.closeCart(actionTypes.CART_CLOSE, null)} />
                         <CartSummary country={country} deleteItem={deleteItemFromCart} cartList={cartList} />
                         <CartTotal country={country} calculateSummary={calculateSummary()} />
                    </div>
               </div>
          )}
     </Transition>

}

const mapStateToProps = state => {
     return {
          cartOpen: state.cartOpen,
          cartList: state.cartList,
     }
}

const mapDispatchToProps = dispatch => ({
     closeCart: (type, purpose) => dispatch(action.utility(type, purpose)),
     setCartList: () => dispatch(action.addToCart()),
     updateCart: () => dispatch(action.updateCart()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);