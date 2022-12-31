import '../App.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {Nav} from 'react-bootstrap';
import {addCart} from '../store'
import { useDispatch } from 'react-redux';
import Recent from './Recent';
import Swal from 'sweetalert2';


const Detail = ({shoes}) => {

   

    let {id} = useParams();
    let found = shoes.find((item) => item.id == id);
    let [popup, setPopup] = useState(true);
    let [tab, setTab] = useState(0);
    let [fade2, setFade2] = useState('');
    let dispatch = useDispatch();

    useEffect(() => {
        let out = localStorage.getItem('watched');
        out = JSON.parse(out);
        out.push(found.id);
        out = [...new Set(out)];
        localStorage.setItem('watched', JSON.stringify(out));
    },[])
    

    useEffect(() => {
        let a = setTimeout(() => {setPopup(false)},3000)
        setFade2('end');

       return ()=>{
        clearTimeout(a)
        setFade2('');
       }
    },[])

    const navigate = useNavigate();

    const handleCart = () => {
        Swal.fire({
            icon: "info",
            title: "추가",
            text: "장바구니로 이동하시겠습니까?",
            showCancelButton: true,
            confirmButtonText: "확인",
            cancelButtonText: "취소",
        }).then((res) => {
            if (res.isConfirmed) {
                 navigate('/cart');
            }
            else{
                //취소
                return;
            }
        })
    };


    return (
        <>
            <div className={`container start ${fade2}`}>
               {
                popup === true ? <div className='alert alert-warning'>
                3초 이내 구매시 할인
                    </div> : null
               }
               {/* <input onChange={(e)=>{setInput(e.target.value)}}></input> */}
                <div className="row">
                    <div className="col-md-6">
                    <img src={`https://codingapple1.github.io/shop/shoes${parseInt(id)+1}.jpg`} width="100%" alt='신발사진' />
                    </div>
                    <div className="col-md-6">
                    <h4 className="pt-5">{found.title}</h4>
                    <p>{found.content}</p>
                    <p>{found.price}</p>
                    <button className="btn btn-danger" onClick={()=>{dispatch(addCart(found)); handleCart()}}>주문하기</button> 
                    </div>
                </div>
              
                <Recent shoes={shoes}/>
            
                <Nav variant="tabs"  defaultActiveKey="link0" width="80%">
                    <Nav.Item>
                    <Nav.Link eventKey="link0" onClick={()=>{setTab(0)}}>상세정보</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="link1" onClick={()=>{setTab(1)}}>상품평</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                    <Nav.Link eventKey="link2" onClick={()=>{setTab(2)}}>문의</Nav.Link>
                    </Nav.Item>
                </Nav>
                <TabContent tab={tab} shoes={shoes} id={id}/>
               
            </div>
        </>
    );
};

function TabContent ({tab, shoes, id}) {

    let [fade, setFade] = useState('');
    useEffect(()=>{
        let a = setTimeout(()=>{setFade('end');},100)
        
        return ()=>{
            setFade('');
            clearTimeout(a);
        }
    },[tab])

    return <div className={`start ${fade}`}>
        { [<div>{shoes[id].title} Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum nobis eum iste. Incidunt a in modi, sed, odio eius corporis eligendi odit obcaecati debitis officiis veritatis numquam nobis quaerat eveniet?</div>,
        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, suscipit nobis dolorem omnis consequuntur veniam autem nam? Natus, molestias in labore voluptatibus esse dicta earum quasi tempore consequatur a beatae.</div>,
        <div>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat dolore sapiente, perferendis laudantium dignissimos inventore impedit vel assumenda non praesentium soluta similique fugit ipsam voluptas ab consequuntur veniam? Explicabo, voluptatem?</div>][tab]}
    </div>
}

export default Detail;