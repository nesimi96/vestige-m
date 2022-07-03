import React from 'react';
import styled from 'styled-components'

const InputComponent = (props) => {

    const style = props.style();

    return <Input onChange={props.inputVal}
     theme={style.style} placeholder={style.placeholder} type={props.text}/>
}

export default InputComponent

const Input = styled.input`
  
  &:focus {
      outline: none;
  }

  ${props => props.theme}
`;

