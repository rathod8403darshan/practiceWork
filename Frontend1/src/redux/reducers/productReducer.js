import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  getProduct: [],
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProductData:(state,action)=>{
      state.getProduct = action.payload
    }
  },
})

export const { getProductData } = productSlice.actions

export default productSlice.reducer