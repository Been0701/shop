import React, { useState } from 'react';
import {Col} from 'react-bootstrap';
import data from './data.js';

const Shoes = ({i}) => {
    let [n, setN] = useState(0);
    let [shoes] = useState(data);
    // setN(i);
    return (
        <div>
            <Col sm>
                <img src={`https://codingapple1.github.io/shop/shoes${n+1}.jpg`} width="80%" alt='신발사진'/>
                <h4>{shoes[`${n}`].title}</h4>
                <p>{shoes[`${n}`].price}</p>
            </Col>
        </div>
    );
};

export default Shoes;