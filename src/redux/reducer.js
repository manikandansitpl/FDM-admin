import { createSlice } from "@reduxjs/toolkit";

const optionSlice = createSlice({
    name:"option",
    initialState:{value:{name:"", post:[]}},
    reducers:{
        changeOption:((state,action)=>{
            state.value = action.payload
        })
    }
})

export const {changeOption} = optionSlice.actions;
export default optionSlice.reducer ;