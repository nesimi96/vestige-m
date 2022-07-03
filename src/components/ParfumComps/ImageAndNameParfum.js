import React from 'react';
import '../../sass/main.scss';

const ImageAndNameParfum = (props) => {

    const parfumData = props.parfumData;

    return <div className="ImageAndNameParfum">
                <div className="ImageAndNameParfum-img-wrapper"> 
                      <img  src={require(`../../assets/images/perfums/${parfumData.names.img}.png`)}/>
                </div>
                <div className="ImageAndNameParfum-name">
                    <p> {parfumData.names.UI} </p>
                </div>
                <div className="ImageAndNameParfum-bottom-line"> </div>
           </div>
}

export default ImageAndNameParfum;

