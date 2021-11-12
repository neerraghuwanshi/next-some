import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    data: [],
    loading: false,
}

const messagesSlice = createSlice({
    initialState,
    name: 'messages',
    reducers: {
        loading(state, action) {
            state.loading = action.payload
        },

        update(state, action) {
            const payload = action.payload
            for (let property in payload) {
                state[property] = payload[property]
            }
        },

        addMessage(state, action) {
            state.data.push(action.payload)
        },
    },
})


export const messagesActions = messagesSlice.actions

export default messagesSlice.reducer