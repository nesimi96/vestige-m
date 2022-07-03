import React, { useState } from 'react';
import '../../sass/main.scss';
import RightSlimArrow from '../../components/svg/RightSlimArrow';

const ArticalInfo = (props) => {

    const [desVisible, setDesVisible] = useState(null);

    const iconStyle = {
        width: 12,
        height: 12,
        transform: desVisible ? 'rotate(90deg)' : 'rotate(0)',
        transition: 'all .15s ease-in',
    }

    const lists = props.list.map((cur, ind) => {
        if(props.list.length > 1) {
            return <li key={ind}> {cur} </li>
        } else {
            return <p key={ind}> {cur} </p>
        }
        
    })

    const toggleDescription = () => {
        setDesVisible(!desVisible);
    }


    return <div className="ArticalInfo">
                <div onClick={() => toggleDescription()} className="ArticalInfo-header">
                      <div> 
                          <RightSlimArrow style={iconStyle} />
                      </div>
                 <p>{ props.description } </p>
                </div>
                <div style={{
                    display: desVisible ? 'flex' : 'none',
                    padding: props.list.length > 1 ? '15px 15px 15px 20px' : '0 15px 0 20px'
                }} className="ArticalInfo-description">
                    { lists }
                </div>
           </div>
}

export default ArticalInfo;