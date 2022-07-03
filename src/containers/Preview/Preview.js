import React from 'react';
import '../../sass/main.scss';
import PreviewComp from '../../components/PreviewComponent/PreviewComp';

const Preview = (props) => {

    const router = props.route;

     
    const data = [{img: 'men-preview', text: 'MUŠKI PARFEMI'}, 
    {img: 'women-preview', text: 'ŽENSKI PARFEMI'}]
    const content = data.map((cur, ind) => <PreviewComp country={props.country} router={router} key={ind}
     img={cur.img} text={cur.text}/>)

    return <div className="Preview">
                { content }
           </div>
}

export default Preview;