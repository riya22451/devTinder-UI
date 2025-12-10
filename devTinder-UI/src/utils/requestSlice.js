import { createSlice } from "@reduxjs/toolkit";

const requestSlice=createSlice({
    name:'requests',
   initialState: [],

    reducers:{
        addRequests:(state,action)=>{
            return action.payload
        },
        clearRequests:(state,action)=>{
           const newArray= state.filter((req)=>req._id!==action.payload)
           return newArray
        }
    }
})
export default requestSlice.reducer
export const {addRequests,clearRequests}=requestSlice.actions