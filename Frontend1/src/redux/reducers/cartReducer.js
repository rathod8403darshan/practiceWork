import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartData: {},
}

export const cartSlice = createSlice({
  name: 'cartData',
  initialState,
  reducers: {
    getAllCartData:(state,action)=>{
      state.cartData = action.payload
    }
  },
})

export const { getAllCartData } = cartSlice.actions

export default cartSlice.reducer