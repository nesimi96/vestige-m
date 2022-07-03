import React from 'react';
import * as actionTypes from '../actions/actionTypes';

const initialState = {
    searchOpen: null,
    cartList: null,
    cartOpen: null,
    cartUpdated: null,
    navOpen: null,
    countryAlert: true,
    country: 'BA'
}

const reducer = (state = initialState, action) => {

    switch(action.type){
        case actionTypes.SEARCH_OPEN :
          return utilityFunc(state, state.searchOpen = action.purpose)
        case actionTypes.SEARCH_CLOSE :
            return utilityFunc(state, state.searchOpen = action.purpose)
        case actionTypes.CART_OPEN :
            return utilityFunc(state, state.cartOpen = action.purpose)
        case actionTypes.CART_CLOSE :
            return utilityFunc(state, state.cartOpen = action.purpose)
        case actionTypes.SET_COUNTRY :
            return utilityFunc(state, state.country = action.purpose)
        case actionTypes.SET_COUNTRY :
            return utilityFunc(state, state.countryAlert = false)
        case actionTypes.ADD_TO_CART :
            return utilityFunc(state, state.cartList = action.cartList)
        case actionTypes.NAV_OPEN :
            return utilityFunc(state, state.navOpen = action.purpose)
        case actionTypes.NAV_CLOSED :
            return utilityFunc(state, state.navOpen = action.purpose)
        case actionTypes.CART_UPDATED :
            return utilityFunc(state, state.cartUpdated = !state.cartUpdated)
    }

     return state;
}

export default reducer;



// UTILITY FUNC FOR CHANGING STATE. 
const utilityFunc = (state, newState) => {
     return {
         ...state,
         ...newState
     }
}
