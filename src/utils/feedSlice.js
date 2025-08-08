import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feed",
    initialState:null,
    reducers:{
        addFeed: (state,action)=>{
            return action.payload;
        },
        removeUserfromFeed :(state,action)=>{
            const newArray = state.filter(user=> user._id != action.payload);
                return newArray;
        }
    }
})

export const {addFeed,removeUserfromFeed} = feedSlice.actions;
export default feedSlice.reducer;
