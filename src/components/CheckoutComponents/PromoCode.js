import React from 'react';
import '../../sass/main.scss';
import Input from '../../components/Input/Input';
import SecondaryButton from '../../components/Buttons/SecondaryButton';

const PromoCode = (props) => {
    return <div className="PromoCode">
                <Input inputVal={(e) => props.typePromoCode(e)} style={inputStyle} type="text" />
                <div className="PromoCode-button">
                    <SecondaryButton click={() => props.checkPromoValidation()} text="POŠALJI"
                    style={{ fontSize: 10.5, letterSpacing: 1.3, backgroundColor: '#866c4e'}} />
                </div>
           </div>
}

export default PromoCode;


const inputStyle = () => {
    return  {
        style: `
      margin: auto;
      width: 100%;
      height: 25px;
      letter-spacing: .3px;
      font-size: 16px;
      border-radius: 2px;
      font-weight: 500;
      padding-left: 7px;
      border: .5px solid rgba(0, 0, 0, .4);
      transition: all .2s ease-in;
      color: rgba(0, 0, 0, .92);

      &::placeholder {
        font-weight: 300;
        font-size: 12.5px;
        font-style: italic;
    }

      &:focus {
        border: .6px solid rgba(0, 0, 0, .8);
      }
        `,
       placeholder: 'Unesite vaučer za popust'
    }
}

