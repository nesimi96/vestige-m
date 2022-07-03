import * as actionTypes from './actionTypes';

// UTILITY FUNCTION FOR ONE PURPOSE
export const utility = (type, purpose) => {

    return {
        type: type,
        purpose: purpose
    }
}


// ADD ITEM TO LOCAL STORAGE 
export const itemToLocalStorage = (cartObj) => {

    const cartItem = {
        'parfumData': cartObj,
        'price': cartObj.activePrice
    }

    let oldData = null;
    if (JSON.parse(localStorage.getItem("cartItem"))) {
        oldData = JSON.parse(localStorage.getItem("cartItem"))
    } else {
        oldData = [];
    }

    let lsObj = null;
    lsObj = [...oldData, cartItem];

    localStorage.setItem('cartItem', JSON.stringify(lsObj))

    return {
        type: null
    }

}

// UPDATE STATE WITH LOCAL STORAGE
export const addToCart = () => {

    let country = localStorage.getItem('RS')

    const updateLocalStorage = (items) => {
        if(items){
            let counter = 0;

            items.forEach((cur) => cur.parfumData.activePrice.ml === '55ml' ? counter++ : null)
            
            let currentPrice = null;
            items.forEach(cur => {
               if(cur.price.ml === '55ml'){
                  if(counter >= 2) currentPrice = country !== "BA" ? '1000' : '2000';
                  //else if(counter >= 2) currentPrice = country !== "BA" ? '1000' : '2000';
                  else { currentPrice = country !== "BA" ? '1200' : '2400' }
                  cur.price.price = currentPrice;
                  cur.parfumData.activePrice.price = currentPrice
                  cur.parfumData.parfumData.categoryPrice = currentPrice
               }

               if(country !== 'BA' && cur.price.ml === '55ml'){ 
                   console.log(counter)
                   if(counter >= 2){ currentPrice = '1000'
                   }else { currentPrice = '1300' }

                    cur.price.price = currentPrice;
                    cur.parfumData.activePrice.price = currentPrice
                    cur.parfumData.parfumData.categoryPrice = currentPrice
               }
            })

          //  console.log(items)
            
            localStorage.setItem('cartItem', JSON.stringify(items))
            console.log(updateCart())

        }
    }

    const cartList = JSON.parse(localStorage.getItem("cartItem"));
    
    updateLocalStorage(cartList)
    
    return {
        type: actionTypes.ADD_TO_CART,
        cartList: cartList,

    }
}

export const updateCart = () => {

    return {
        type: actionTypes.CART_UPDATED,
        purpose: true,
    }
}
