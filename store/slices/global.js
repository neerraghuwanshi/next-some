import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    width: 0,
    height: 0,
    error: null,
}

const globalSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        error(state, action) {
            state.error = action.payload
        },

        width(state, action) {
            state.width = action.payload
        },

        height(state, action) {
            state.height = action.payload
        },
    },
})


export const globalActions = globalSlice.actions

export default globalSlice.reducer