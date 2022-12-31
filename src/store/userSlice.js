import { createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name: 'user',
    initialState : {name :'kim', age : 20},
    reducers : {
      changeName(state) {
        state.name = 'park'
      },
      changeAge(state, age){
        state.age += age.payload;
      }
    }
})
export let {changeName, changeAge} = user.actions;

export default user;