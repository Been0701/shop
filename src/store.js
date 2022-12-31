import { configureStore, createSlice } from '@reduxjs/toolkit'
import user from './store/userSlice'


let stock = createSlice({
    name: 'stock',
    initialState : [10, 11, 12]
})


let cart = createSlice({
  name : 'cart',
  initialState : [
    {id : 0, name : 'White and Black', count : 2},
    {id : 2, name : 'Grey Yordan', count : 1}
  ] ,
  reducers : {
    plusAmount(state, action){
      let found = state.find((item) => item.id === action.payload);
      found.count++;
    },
    minusAmount(state, action){
      let found = state.find((item) => item.id === action.payload);
      if (found.count >= 1 ) {
        found.count--;
      }
      
    },
    addCart(state, action){
      let num = state.findIndex((item) => item.id === action.payload.id);
      if(num < 0){
        state.push({id:action.payload.id,
        name:action.payload.title,
        count:1})
      } else {
        state[num].count++;
      }
    },
    deleteItem(state, action){
      let newArr = state.filter((item) => item.id !== action.payload);
      return newArr;
    }
    },
    
})

export let {plusAmount, minusAmount, addCart, deleteItem} = cart.actions;

export default configureStore({
  reducer: {
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer
   }
}) 