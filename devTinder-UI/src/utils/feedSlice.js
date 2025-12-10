import { createSlice } from "@reduxjs/toolkit";

const feedSlice=createSlice({
    name:'feed',
    initialState:[],
    reducers:{
        setFeed:(state,action)=>{
            return action.payload
        },
        clearFeed:(state,action)=>{
            const newArray= state.filter((feedItem)=>feedItem._id!==action.payload)
            return newArray
        }
    }
    
})
export const {setFeed,clearFeed}=feedSlice.actions
export default feedSlice.reducer