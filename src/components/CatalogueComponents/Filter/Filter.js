import React, { useState } from 'react';
import '../../../sass/main.scss';
import FilterItem from './FilterItem';
import Check from '../../svg/Check';

const Filter = (props) => {

    const [isActiveDescription, setisActiveDescription] = useState({ active: null, category: '' });

    const isolatedBrands = [];
    if(props.parfumData){ props.parfumData.forEach(curParf => isolatedBrands.push(curParf.brand)) }
    
    let copied = [...isolatedBrands];
    const removeDuplicates = () => {
        isolatedBrands.forEach((isoBrand, index) => {
            let counter = 0
            let num = null;
    
            copied.forEach((copy, copyIndex) => {
                if(isoBrand === copy) {
                    counter++
                    num = copy;
                }
            })
    
          if(counter > 1){
              copied.forEach((copy, copyInd) => {
                  if(copy === num && counter > 0){ copied.splice(copyInd, 1)  }
              }) 
          }
        })

        return copied;
    }

    const brands = removeDuplicates();

    const filteringData = [
        { category: 'sex', name: 'SPOL', options: ['muški', 'ženski'] },
        { category: 'category', name: 'KATEGORIJA', options: ['100ml', '55ml'] },
        { category: 'sort', name: 'SORTIRAJ', options: ['Najpopularniji', 'Najbolje ocjenjeni', 'Najjeftiniji', 'Najskuplji'] },
        { category: 'brand', name: 'BREND', options: brands },
    ]

    const changeActiveDes = (category, itemIsActive) => {
        const copied = { ...isActiveDescription }
        copied.category = category
        copied.active = !itemIsActive;
        setisActiveDescription(copied)
    }


    // FILTER ITEMS OR CATEGORIES. LIKE "KATEGORIJA", "BRAND", "SORTIRAJ"
    const filterItem = filteringData.map((curFilter, index) => {
        return <FilterItem text={curFilter.name} key={index} isActiveDescription={isActiveDescription}
            setisActiveDescription={(itemIsActive) => changeActiveDes(curFilter.category, itemIsActive)} />
    })

    // FILTER OPTIONS IN MAIN CATEGORIES. like "paco rabanne, tom ford, najjeftinije, muški.."
    const filtersActivated = [];
    filtersActivated[0] = props.sorts;
    filtersActivated[1] = props.parfCategory;
    props.filterData.forEach(cur => {
        let isolatedSortCategory = null;
        let isolatedBrandCategory = null;
        filteringData.forEach(curFltData => curFltData.category === 'sort' ? isolatedSortCategory = [...curFltData.options] : null);
        filteringData.forEach(curFltData => curFltData.category === 'brand' ? isolatedBrandCategory = [...curFltData.options] : null);

        filtersActivated.forEach(curFilAct => {
            isolatedSortCategory.forEach(curIso => !cur.option === curIso ? filtersActivated.push(null) : null)
            isolatedBrandCategory.forEach(curBrand => cur.option === curBrand ? filtersActivated.push(curBrand) : null)
        })
    })


    let filterOptions = filteringData.find(cur => isActiveDescription.category === cur.category)
    let optionItems = null;
    if (filterOptions) {
        optionItems = filterOptions.options.map((cur, ind) => {
            const filterOptionStyle = { transition: 'all .15s ease-in-out' }
            let checkSvg = null;
            const svgCheckStyle = { width: 10, height: 10, color: 'rgba(0, 0, 0, .7)', position: 'absolute',
        right: '15%' }
            filtersActivated.forEach(curFilter => {
                if (cur === curFilter) { 
                    filterOptionStyle.backgroundColor = '#eee'
                    checkSvg = <Check style={svgCheckStyle} />
                 }
            })


            const copiedIsActive = {...isActiveDescription};
            const filtOptionMeths = () => {
                copiedIsActive.active = null;
                setisActiveDescription(copiedIsActive)
                props.setFiltering(filterOptions.category, cur);
                if (filterOptionStyle.backgroundColor === '#eee') { props.removeFilter(cur) }
            }

            return <div onClick={() => filtOptionMeths()} style={filterOptionStyle} key={ind} className="Filter-options__option">
                <p> {cur} </p>
                { checkSvg }
            </div>
        })
    }

    const filterOptionsStyle = {
        display: isActiveDescription.active ? 'block' : 'none',
    }

    return <div className="Filter">
                <div className="Filter-filters">
                    {filterItem}
                </div>
                <div style={filterOptionsStyle} className="Filter-options">
                    {optionItems}
                </div>
            </div>
}

export default Filter;