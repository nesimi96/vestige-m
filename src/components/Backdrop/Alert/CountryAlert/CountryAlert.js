import React, { useState } from 'react';
import '../../../../sass/main.scss';
import ChooseBox from './ChooseBox';
import { connect } from 'react-redux'
import * as action from '../../../../store/actions/actions';

const CountryAlert = (props) => {

    const [alertOpened, setAlertOpened] = useState(true) 

    if(!alertOpened) return null

    return <div className="CountryAlert">
                <ChooseBox setCountry={props.setCountry} setAlertOpened={setAlertOpened} />
           </div>
}

const mapDispatchToProps = dispatch => ({
    setCountry: (type, purpose) => dispatch(action.utility(type, purpose))
  })

export default connect( null ,mapDispatchToProps)(CountryAlert);