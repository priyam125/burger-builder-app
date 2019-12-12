import React from 'react'; 
import Aux1 from '../../../../hoc/Auxi/Aux1';

const toggle = (props) => (
    <Aux1>
        <div onClick ={props.clicked}>Menu</div>
    </Aux1>
);
 
export default toggle;