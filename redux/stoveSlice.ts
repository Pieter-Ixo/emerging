import { createSlice } from "@reduxjs/toolkit";

interface init {
    enteties: any[]
}

const initialState: init = {
    enteties: []
}

export const StovesSlice = createSlice({
    name: "stoves",
    initialState,
    reducers: {
        setStoves: (state, payload) => {
            state.enteties = payload.payload
        }
    }
})

export const { setStoves } = StovesSlice.actions

export const selectStoves = (state) => state.Stoves;

export default StovesSlice.reducer;