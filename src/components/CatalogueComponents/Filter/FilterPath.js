import React from 'react';
import '../../../sass/main.scss';
import FilterPathItem from './FilterPathItem';

const FilterPath = (props) => {

    
    const filters = [props.sort];
    props.filterData.forEach((cur) => filters.push(cur))
    console.log(filters);


    return <div className="FilterPath">
                <FilterPathItem text="Paco Rabbane" />
           </div>
}

export default FilterPath;