import React, { useEffect, useMemo, useState, useRef } from 'react';
import '../../sass/main.scss';
import Hamburger from '../../components/Hamburger/Hamburger';
import Logo from '../../components/Images/Logo';
import SearchIcon from '../../components/svg/SearchIcon';
import CartSvg from '../../components/svg/Cart';
import Search from './Search/Search';
import Cart from '../Cart/Cart';
import Navigation from '../../containers/Navigation/Navigation';
import DesktopNav from '../../components/NavigationComponents/DesktopNav/DesktopNav';
import Backdrop from '../../components/Backdrop/Backdrop';
import Alert from '../../components/Backdrop/Alert/Alert';
import { Transition } from 'react-transition-group';
import { connect } from 'react-redux';
import axios from 'axios';
import * as action from '../../store/actions/actions';
import * as actionTypes from '../../store/actions/actionTypes';

const Toolbar = (props) => { 

    const [toolbarBckr, setToolbarBckr] = useState(null)
    
    const pathName = props.route.location.pathname

    let homepage = null;
        if(pathName === '/'){
           homepage = true
        }

    if(homepage){
            window.addEventListener('scroll', () => {
                if(window.scrollY !== 0 && !toolbarBckr) setToolbarBckr(true)
                else if(window.scrollY === 0 && toolbarBckr) setToolbarBckr(false)
            })
    }

    let search = null;
    search = props.searchOpen ? <Search closeSearch={() => props.searchClose(actionTypes.SEARCH_CLOSE, null)} 
    searchOpen={props.searchOpen}/> : null;

    let articalOrdered = null;
    articalOrdered = props.cartList ? props.cartList.length > 0 ? 
      <Transition in={props.cartList.length} timeout={0} mountOnEnter unmountOnExit>
          {state => (
              <div style={{
                  animation: 'articalOrdered .25s ease-in-out',
              }} className="Toolbar-elements-holder__icons-cart-numHolder">
                  { props.cartList.length > 0 ? props.cartList.length : null }
              </div>
          )}

      </Transition>
    : null : null;

    let discountAlert = null;
    if(pathName === '/') discountAlert = <Alert />


    return <div className="Toolbar" style={{backgroundColor:
     !toolbarBckr && homepage ? 'rgba(0, 0, 0, .08)' : 'rgba(0, 0, 0, 1)',
     boxShadow: homepage ? 'none' : '10px 10px 20px rgba(0, 0, 0, .17)'}}>
               <div className="Toolbar-elements-holder">
                    <div onClick={() => props.openNavigation(actionTypes.NAV_OPEN, true)} className="Toolbar-elements-holder__hamburger">
                          <Hamburger />
                    </div>
                    <div onClick={() => window.location.href="/"} className="Toolbar-elements-holder__logo">
                          <Logo />
                    </div>
                    <div className="Toolbar-elements-holder__icons">
                        <div onClick={() => props.openSearch(actionTypes.SEARCH_OPEN, true)} 
                        className="Toolbar-elements-holder__icons-search">
                            <SearchIcon />
                        </div>
                        <div onClick={() => props.openCart(actionTypes.CART_OPEN, true)}  className="Toolbar-elements-holder__icons-cart">
                            { articalOrdered }
                            <CartSvg />
                        </div>
                    </div>
               </div>
               <Cart />
               { props.navOpen ? <Navigation route={props.route} navOpen={props.navOpen} 
               closeNavigation={() => props.closeNavigation(actionTypes.NAV_CLOSED, null)}/> : null }
               { window.innerWidth > 650 ? <DesktopNav route={props.route}/> : null}
               { search }
               <Backdrop openCart={() => props.openCart(actionTypes.CART_CLOSE, null)} cartOpen={props.cartOpen} />
               { discountAlert }
           </div>
}

const mapStateToProps = state => {
    return {
        searchOpen: state.searchOpen,
        cartOpen: state.cartOpen,
        cartList: state.cartList,
        navOpen: state.navOpen
    }
}

const mapDispatchToProps = dispatch => ({
    openSearch: (type, purpose) => dispatch(action.utility(type, purpose)),
    searchClose: (type, purpose) => dispatch(action.utility(type, purpose)),
    openCart: (type, purpose) => dispatch(action.utility(type, purpose)),
    openNavigation: (type, purpose) => dispatch(action.utility(type, purpose)),
    closeNavigation: (type, purpose) => dispatch(action.utility(type, purpose)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);