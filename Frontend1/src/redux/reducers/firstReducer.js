import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  getuser: {},
}

export const ragisterSlice = createSlice({
  name: 'getuser',
  initialState,
  reducers: {
    getRagisterUser:(state,action)=>{
      state.getuser = action.payload
    }
  },
})

export const { getRagisterUser } = ragisterSlice.actions

export default ragisterSlice.reducer