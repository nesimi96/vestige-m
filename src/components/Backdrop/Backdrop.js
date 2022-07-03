import React from 'react'
import '../../sass/main.scss';
import { Transition } from 'react-transition-group';

const Backdrop = (props) => {

    if(props.cartOpen){
        return <Transition in={props.cartOpen} timeout={0} mountOnEnter unmountOnExit >
            {state => (
                <div onClick={props.openCart} style={{
                    transition: state === 'entered' ? 'all .35s ease-in-out' : ''
                }} className="Backdrop"></div>
            )}
            </Transition>
    }else return null
}

export default Backdrop;