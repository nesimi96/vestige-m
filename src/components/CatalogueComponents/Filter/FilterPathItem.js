import React from 'react';
import '../../../sass/main.scss';

const FilterPathItem = (props) => {
return <div className="FilterPath-Item">
           { props.text }
           <div className="FilterPath-Item-close">  &#10005; </div>
       </div>
}

export default FilterPathItem;