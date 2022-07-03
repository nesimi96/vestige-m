import React, { useState } from 'react';
import '../../sass/main.scss';
import Input from '../../components/Input/Input';
import SubmitButton from '../../components/Buttons/SecondaryButton';
import axios from 'axios';

const Form = (props) => {

    const [inputData, setInputData] = useState([
        {label: 'Ime i prezime', val: '', type: 'name', id: 'usernames', error: null},
        {label: 'Adresa', val: '', type: 'text', id: 'adress', error: null},
        {label: 'Grad', val: '', type: 'text', id: 'city', error: null},
        {label: 'Kontakt telefon', val: '', type: 'tel', id: 'phone', error: null},
    ]);
    const [emailData, setEmailData] = useState({label: 'Email', val: '', type: 'email', id: 'email'})

    const inputValue = (e, index, id) => {
        const copyInputData = [...inputData];
        copyInputData[index].val = e.target.value;
        setInputData(copyInputData);
    }

    // CHECK FORM VALIDATION
    const checkInputsValidation = () => {
        const inputDataCopy = [...inputData];

        // form validation
        inputDataCopy.forEach((input, index) => {
           // Check if inputs are empty string
            if(input.val === ''){
                inputDataCopy[index].error = 'Polje mora biti popunjeno'
            }else if(input.val.length < 5){
                inputDataCopy[index].error = 'Unos zahtjeva 5 znamenki'
            }else {
                inputDataCopy[index].error = null;
            }

            const onlyLetters = /^[a-zA-Z\s]+$/;
            const onlyNumbers = /[0-9]/gi;

            switch(input.id){
                case 'usernames' :
                    if(onlyNumbers.test(input.val)){
                        inputDataCopy[index].error = 'Polje ne smije sadržavati broj'
                    }
                break;
                case 'phone' :
                    if(onlyLetters.test(input.val)){
                        inputDataCopy[index].error = 'Polje dopušta samo unos brojeva'
                    }
                break;   
            }
        })

        setInputData(inputDataCopy);
        
        let errors = null;
        inputData.forEach(input => input.error ? errors = true : null)
        
        if(!errors){
            submitForm();
        }
        
    }

    // E-mail Validation
    const emailVal = (e) => {
        const copiedEmail = {...emailData}
       if(e.target.value.includes('@') && e.target.value.length > 5){
           copiedEmail.val = e.target.value;
           setEmailData(copiedEmail)
       }
    }


    const submitForm = () => {
        props.sendOrder(emailData, inputData);
    }

    const inputs = inputData.map((curInput, inpIndex) => {
        return <div key={inpIndex} className="Form-inputs">
                    <p> {curInput.label} </p>
                    <Input inputVal={(e) => inputValue(e, inpIndex, curInput.id)} style={inputStyle} type={curInput.type} />
                    { curInput.error ? <p className="Form-inputs-error"> {curInput.error} </p> : null }
                </div>
    })

    return <div className="FormWrapper">
                <div className="FormWrapper-header">
                    <h3> Podatci kupca </h3>
                </div>
                <form className="Form">
                    { inputs }
                    <div className="Form-inputs">
                        <p> {emailData.label} </p>
                        <Input inputVal={(e) => emailVal(e)} style={inputStyle} type={emailData.type} />
                    </div>
                    <div className="Form-button"> 
                    <SubmitButton click={() => checkInputsValidation()}
                    style={{ width: '100%', fontSize: 15, letterSpacing: 1.5, backgroundColor: '#866c4e'}} text="POŠALJI" />
                    </div>
                </form>
           </div>
}

export default Form;

const inputStyle = () => {
    return  {
        style: `
      margin: auto;
      width: 100%;
      height: 35px;
      letter-spacing: .7px;
      font-size: 16px;
      border-radius: 5px;
      font-weight: 500;
      padding-left: 7px;
      border: 1px solid rgb(202, 202, 202);
      transition: all .2s ease-in;
      color: rgba(0, 0, 0, .92);

      &:focus {
        border: .8px solid rgba(0, 0, 0, .8);
      }
        `,
       placeholder: ''
    }
}
