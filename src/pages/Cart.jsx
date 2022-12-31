import React from 'react';
import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { plusAmount, minusAmount, deleteItem } from '../store';
import "./Cart.css"

const Cart = () => {

    let state = useSelector((state) => state)
    let dispatch = useDispatch();

    return (
        <div className='container'>
            <h4>{state.user.name}의 장바구니</h4>
           
            <Table>
                <thead>
                    <tr>
                        <th>상품아이디</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {state.cart.map((item, i) => 
                        <tr key={i}>
                            <td>{state.cart[i].id}</td>
                            <td>{state.cart[i].name}</td>
                            <td>{state.cart[i].count}</td>
                            <td>
                                <button className="btn btn-secondary" onClick={() => {
                                    dispatch(plusAmount(state.cart[i].id))
                                }}>+</button>
                                <button className="btn btn-secondary minus" onClick={() => {
                                    dispatch(minusAmount(state.cart[i].id))
                                }}>-</button>
                            </td>
                            <td>
                                <button className="btn btn-warning" onClick={() => {
                                    dispatch(deleteItem(state.cart[i].id))
                                }}>삭제</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table> 
        </div>
    );
};

export default Cart;