import React from 'react';
import styled from 'styled-components'

const PrimaryButton = (props) => {

    const methodsClicked = () => {
        props.toLocalStorage();
    }

    let style = props.style();

   return <Button onClick={() => props.click()} theme={style}>{props.text}</Button>
    
}

export default PrimaryButton;

const Button = styled.button`
@keyframes anime {
   0% {
       transform: translateY(0);
   }

   50% {
    transform: translateY(2px);
   }
   100% {
    transform: translateY(0);
   } 
}
cursor: pointer;
&:focus {
    outline: none;
    animation: anime .25s ease-in-out;
}
${props => props.theme},

`;

