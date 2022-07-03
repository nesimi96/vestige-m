import React, { useState, useMemo } from 'react';
import '../../../sass/main.scss';
import RightSlimArrow from '../../../components/svg/RightSlimArrow';

const FilterItem = (props) => {

    const [isActive, setisActive] = useState(true);

    const methods = () => {
        props.setisActiveDescription(isActive);
        setisActive(!isActive)
    }

    useMemo(() => {
      if(!props.isActiveDescription.active){ setisActive(null) }
    }, [props.isActiveDescription.active])

     const svgStyle = {
         width: 10,
         height: 10,
         fill: 'rgba(0, 0, 0, .7)',
         transition: 'all .12s ease-in-out',
         cursor: 'pointer',
         transform: isActive ? 'rotate(90deg)' : 'rotate(0)'
     }

    return <div onClick={() => methods()} className="Filter-Item">
                <p> {props.text} </p>
                <RightSlimArrow style={svgStyle} />
            </div>
}

export default FilterItem;