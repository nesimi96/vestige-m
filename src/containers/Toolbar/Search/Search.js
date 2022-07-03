import React, { useState, useEffect, useCallback, useRef } from 'react';
import '../../../sass/main.scss';
import BackDirection from '../../../components/svg/BackDirection';
import InputComponent from '../../../components/Input/Input';
import SearchItem from './SearchItem/SearchItem';
import { Link, Route } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';
import { Transition } from 'react-transition-group';

const Search = (props) => {

    const [inputValue, setInputValue] = useState('');
    const [data, setData] = useState('');
    const [counter, setCounter] = useState(0);

    // When Component Mounts, we make http request and that's it...
    useEffect(() => {
        axios.get('https://vestige-2172c.firebaseio.com/perfums.json')
        .then(res => {
            const extractData = Object.values(res.data);
            const parfumData = parfumsAreThere(extractData)
            setData(parfumData)
        })
        .catch(error => console.log(error))
    }, [])

    // we check for items only if there are on the page
    const parfumsAreThere = (extractData) => {
          const parfumsThere = [];
          extractData.forEach((cur, ind) => {
              if(cur.price.big.price != 0 || cur.price.medium.price != 0) parfumsThere.push(cur)
          })
          
          return parfumsThere;
    }

    let parfumList = null;
    // Alghorithm were we search for perfum from user input...
    const searchParfums = useCallback(() => {
       parfumList = findParfum(inputValue, data);
    }, [inputValue])

    // We find perfum by his name...
    const findParfum = (inputValue, data) => {
        const splitVal = inputValue.split(' ');
        const parfumsList = [];
        
        splitVal.forEach( curVal => {
            if(data){
                  data.forEach((parfum, parfumIndex) => {
                    const searchedWord = parfum.names.UI + '-' + parfum.brand;
                    const regExp = new RegExp(inputValue, 'gi')
                        if(regExp.test(searchedWord)){
                            parfumsList.push(parfum);
                        }
                })
            }
        })

        return parfumsList.slice(0, 10);
    }

    searchParfums();

    
    // Render searched parfums on UI
    let parfumsFound = null;
     parfumsFound = parfumList && inputValue !== '' ? parfumList.map((parfum, index) => {
        return <Link key={index} to={parfum.names.route} style={{textDecoration: 'none'}}>
                    <SearchItem counter={counter} index={index}
                     closeSearch={props.closeSearch}  key={index} parfum={parfum} />
                </Link> 
    }) : null;

     const backDirectStyle = {
         width: '18.5px',
         height: '18.5px',
          fill: 'grey',
    }


    let noParfumFound = null;
    if(parfumsFound) if(parfumsFound.length === 0) noParfumFound = <p style={{
       marginLeft: 20, color: 'rgba(0, 0, 0, .75)', 
    }}>Nema rezultata...</p>

    return <Transition in={props.searchOpen} timeout={0} mountOnEnter unmountOnExit >
           {state => (
             <div style={{
                 animation: state === 'entered' ? 'searchOpening .2s ease-in-out' : ''
             }} className="Search">
                    <div className="Search-Wrapper">
                        <div className="Search-Wrapper-input-holder">
                            <div onClick={props.closeSearch} className="Search-Wrapper-input-holder__back">
                                <BackDirection style={backDirectStyle} />    
                            </div>
                            <div className="Search-Wrapper-input-holder__input">
                                <InputComponent inputVal={(e) => setInputValue(e.target.value)}
                                style={inputStyle} type="text"/>
                            </div>
                        </div>
                        <div className="Search-Wrapper-parfum-box">
                            { noParfumFound }
                        { parfumsFound }
                        </div>
                    </div>
            </div>
           )}

          </Transition>

}


export default connect()(Search);

const inputStyle = () => {
    return  {
        style: `
      width: 100%;
      height: 90%;
      border: 1px solid transparent;
      letter-spacing: .7px;
      font-size: 16px;
      font-weight: 500;

      &::placeholder {
          font-weight: 300;
          font-size: 14px;
          font-style: italic;
      }
        `,
       placeholder: 'Potraži ime parfema ili brenda...'
    }
}
