import React from 'react';
import '../../sass/main.scss';
import ParfumPreviw from '../../components/CatalogueComponents/ParfumPreview';
import Loader from '../../components/Loader/Loader';

const CataloguePreview  = (props) => {
  
   if(props.parfumData){
  
     let renderParfums = null;
     renderParfums = props.parfumData.map((parfum, index) => {
       return <ParfumPreviw country={props.country} parfum={parfum} addToLocalStorage={props.addToLocalStorage} updateCart={props.updateCart}
        router={props.route} price={parfum.categoryPrice} route={parfum.names.route}
       brand={parfum.brand} img={parfum.names.img} nameUI={parfum.names.UI} parfCategory={props.parfCategory} key={index} />
     }) 

    return <main className="CataloguePreview" style={{height: props.parfumData ? 'max-content' : '100vh'}}>
               { renderParfums }  
          </main>

   }else {
     return <main className="CataloguePreview" style={{height: props.parfumData ? 'max-content' : '100vh'}}>
              <div> <Loader />  </div>
          </main>
    }

}

export default CataloguePreview;


