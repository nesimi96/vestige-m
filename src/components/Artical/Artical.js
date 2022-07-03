import React from 'react';
import '../../sass/main.scss';
import { articalData } from '../../articalData';
import ArticalSlider from './ArticalComponents/ArticalSlider/ArticalSlider';
import ArticalController from './ArticalComponents/ArticalController/ArticalController';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';

const Artical = (props) => {

    const articlesData = articalData();

    return <div className="Artical">
                <div className="Artical-slider-holder">
                     <ArticalSlider articlesData={articlesData} />
                </div>
                <div className="Artical-controller-holder">
                    <ArticalController addToCart={props.addToCart} articlesData={articlesData} />
                </div>
           </div>
}

const mapDispatchToProps = dispatch => ({
    addToCart: () => dispatch(action.itemToLocalStorage())
})

export default connect(null, mapDispatchToProps)(Artical);