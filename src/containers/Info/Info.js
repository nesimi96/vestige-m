import React from 'react';
import '../../sass/main.scss';
import InfoItem from '../../components/InfoItem/InfoItem';
import Truck from '../../components/svg/Truck';
import Payment from '../../components/svg/Payment';
import Return from '../../components/svg/Return';
import Quality from '../../components/svg/Quality';

const Info = () => {

    const data = [{icon: <Truck />, text: 'DOSTAVA ZA 24H'}, {icon: <Payment />, text: 'PLAĆANJE POUZEĆEM'}, 
    {icon: <Return />, text: 'POVRAT NOVCA'}, {icon: <Quality />, text: 'ORIGINALNI TESTERI'}]
    const content = data.map((cur, ind) => <InfoItem key={ind} icon={cur.icon} text={cur.text}/>)

    return <div className="Info">
                { content }
            </div>
}

export default Info;