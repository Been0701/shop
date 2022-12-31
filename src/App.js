import './App.css';
import {Navbar, Container, Nav, Row, Col} from 'react-bootstrap';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom'
import Detail from './pages/Detail';
import data from './data.js';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";
import Cart from './pages/Cart';

export let Context1 = createContext();

function App() {
  
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [more, setMore] = useState(0);

  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify([]))
  },[])


  return (
    <div className="App">

    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>BeenShop</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link onClick={() => {navigate('/')}}>Home</Nav.Link>
          <Nav.Link onClick={() => {navigate('./cart')}}>Cart</Nav.Link>
        </Nav>
      </Container>
    </Navbar>

    <Routes>
      <Route path='/' element={
          <>

            <div className='main-bg'></div>

            <Container>      
              <Row>
                {/* <Card shoes={shoes[0]} i={1}/>   
                <Card shoes={shoes[1]} i={2}/>   
                <Card shoes={shoes[2]} i={3}/>  */}
                {shoes.map((item, i) => {
                    return(
                    <Card key={i} shoes={shoes[i]} i={i}/> 
                    )
                  })} 
              </Row>
            </Container>
            {more <= 1 ? (
              <button className="btn btn-warning" onClick={()=> {
                axios.get(`https://codingapple1.github.io/shop/data${2+more}.json`)
                .then((res)=>{
                  let copy = [...shoes, ...res.data];
                  setShoes(copy);
                })
                .catch(()=>{
                  console.log('데이터 가져오기를 실패했습니다');
                })
                setMore(more+1);
  
              }}>더보기</button>
            ) : null}
          </> 
        }/>
      <Route path='/detail/:id' element={
        // <Context1.Provider value={{ stock, shoes}}> 
          <Detail shoes={shoes}/>
        // </Context1.Provider>
        }/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/event' element={<Event/>}>
        <Route path='one' element={<p>첫 주문시 양배추즙 서비스</p>}/>
        <Route path='two' element={<p>생일기념 쿠폰받기</p>}/>
      </Route>
      {/* 이외의 모든 주소들 => *로 표시 */}
      <Route path='*' element={<div> 존재하지 않는 페이지입니다. </div>}/> 
    </Routes>
      
    </div>
  );
}

function Event() {
  return (
    <div>
      <h2>오늘의 이벤트</h2>
      <Outlet/>
    </div>
  )
}

function Card({shoes, i}) {
  return(
    <>
      <Col sm={4}>
          <Link to ={`/detail/${i}`}>
          <img src={`https://codingapple1.github.io/shop/shoes${i+1}.jpg`} width="80%" alt='신발사진'/>
          </Link>
          <h4>{shoes.title}</h4>
          <p>{shoes.price}</p>
      </Col>
    </>
  )
}



export default App;
