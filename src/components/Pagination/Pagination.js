import React from 'react';
import '../../sass/main.scss';
import PaginationButton from '../Buttons/PaginationButton';
import Arrow from '../svg/Arrow';

const Pagination = (props) => {

    const page = props.page;

    const firstSvgStyle = { width: 12, height: 12, fill: '#333', flex: 1.5 };
    const secondSvgStyle = { width: 12, height: 12, fill: '#333', transform: 'rotate(180deg)', };

    let pageButtons = null;

    // DIFFRENCESS
    var difference = function (a, b) { return Math.abs(a - b); }

    const numOfPages = props.numOfPages;
    const firstPageDiff = difference(page, numOfPages);
    const lastPageDiff = difference(page, numOfPages);

    pageButtons = lastPageDiff <= 2 ? [numOfPages - 2, numOfPages - 1, numOfPages] : 
                                      [page, page + 1, page + 2]; 

    const buttonsData = [
        {text: 1, diff: lastPageDiff < 3 && props.numOfPages > 3 ? null : true},
        {text: '...', diff: lastPageDiff < 3 && props.numOfPages > 3 ? null: true, dots: true},
        {text: props.numOfPages > 2 ? pageButtons[0] : null},
        {text: pageButtons[1]},
        {text: pageButtons[2]},
        {text: '...', diff: lastPageDiff < 3 ? true : null, dots: true},
        {text: numOfPages, func: numOfPages, diff: lastPageDiff < 3 ? true : null},
    ]

    const buttons = buttonsData.map((curButton, btnIndex) => {
        let style = { backgroundColor: curButton.text === page ? 'rgb(231, 228, 228)' : '' }
        if(curButton.dots){ style = {backgroundColor: 'transparent', border: 'none', padding: 5} }
        return <PaginationButton changePage={props.changePage} text={curButton.text}
         func={curButton.func} key={btnIndex} style={style} diff={curButton.diff} />
    })

    return <div className="Pagination">
              { page > 1 ? <div style={{
                  cursor: 'pointer'
              }} onClick={() => props.changePage(page - 1)} className="Pagination-arrows">
                  <Arrow  style={firstSvgStyle} />
              </div> : null }
              { buttons }
              { page < numOfPages ?  <div style={{
                  cursor: 'pointer'
              }} onClick={() => props.changePage(page + 1)} className="Pagination-arrows">
                  <Arrow  style={secondSvgStyle} />
              </div> : null}
           </div>
}

export default Pagination;