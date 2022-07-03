import React, { useCallback, useMemo, useEffect, useState } from 'react';
import '../../sass/main.scss';
import BrandsPhotos from '../Images/BrandsPhotos';

const Brands = (props) => {

    return <div className="Brands">
               <div className="Brands-golden-line"></div>
               <h3>brendovi</h3>
               <div className="Brands-wrapper">
                    <BrandsPhotos />
               </div>
           </div>
           return null
}


export default Brands;