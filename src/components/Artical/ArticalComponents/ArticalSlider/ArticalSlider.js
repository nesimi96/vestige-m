import React, { useState } from 'react';
import '../../../../sass/main.scss';

const ArticalSlider = (props) => {

    console.log(props.articlesData)

    const [currentImg, setCurrentImg] = useState(0);

    const articlesData = props.articlesData;

    const otherImages = articlesData.images.map((cur, ind) => {
        return <img style={{border: ind === currentImg ? '1px solid black' : '1px solid transparent'}} onClick={() => console.log(setCurrentImg(ind))}
          src={require(`../../../../assets/images/atomizers/${articlesData.images[ind]}.jpg`)}/>
    })

    return <div className="ArticalSlider">
                <div className="ArticalSlider-mainImg">
                      <img  src={require(`../../../../assets/images/atomizers/${articlesData.images[currentImg]}.jpg`)}/>
                </div>
                <div style={{width: 50}} className="ArticalSlider-otherImgs">
                      { otherImages }
                </div>
            </div>
}

export default ArticalSlider

// <img  src={require(`../../assets/images/perfums/${parfumData.names.img}.png`)}/>