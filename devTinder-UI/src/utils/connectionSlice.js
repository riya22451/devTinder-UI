import { createSlice } from "@reduxjs/toolkit";
const connectionSlice=createSlice({
    name:'connections',
    initialState:null,
    reducers:{
        setConnections:(state,action)=>{
            return action.payload
        },
        removeConnections:(state,action)=>{
            return null;
        }

    }
})
export default connectionSlice.reducer
export const {setConnections,removeConnections}=connectionSlice.actions