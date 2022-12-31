import React from 'react';
import { Link } from 'react-router-dom';

const Recent = ({shoes}) => {

    let arr = localStorage.getItem('watched');
    arr = JSON.parse(arr);
    arr.reverse();

    return (
        <>
         <div>
            <h6>최근 본 상품</h6>

            {
                arr.map((item) => {
                    let product = shoes.find((shoes) => shoes.id === item)
                    return (
                        <Link to={`/detail/${product.id}`}>
                        <div>{product.title}</div>
                        </Link>
                    )
                })
            }
         </div>   
        </>
    );
};

export default Recent;