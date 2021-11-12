import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    data: [],
    loading: false,
    newChatRequest: false,
}

const chatsSlice = createSlice({
    initialState,
    name: 'chats',
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

        addChat(state, action) {
            const chatIndex = state.data.findIndex(item => item._id === action.payload._id)
            if (chatIndex !== -1) {
                state.data.splice(chatIndex, 1)
            }
            state.data = [ action.payload, ...state.data ]
        },
    },
})


export const chatsActions = chatsSlice.actions

export default chatsSlice.reducer