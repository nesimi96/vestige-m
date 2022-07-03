import React from 'react';
import '../../../../sass/main.scss';

const SearchItem = (props) => {

   const parfum = props.parfum;
   const route = parfum.names.route;   
   
   return  <div onClick={() => props.closeSearch()} className="SearchItem"> 
                         <div className="SearchItem-img">
                             <img  src={require(`../../../../assets/images/perfums/${parfum.names.img}.png`)}/>
                         </div>
                         <div  className="SearchItem-text">
                              <p className="SearchItem-text-brand">{parfum.brand} </p>
                              <p className="SearchItem-text-name">{parfum.names.UI}</p>
                         </div>
                    </div>
          
     }
     
     export default SearchItem
