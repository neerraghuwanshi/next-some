import { configureStore } from '@reduxjs/toolkit'

import authReducer from './slices/auth'
import chatsReducer from './slices/chats'
import globalReducer from './slices/global'
import messagesReducer from './slices/messages'


export const store = configureStore({
    reducer: {
        auth: authReducer,
        chats: chatsReducer,
        global: globalReducer,
        messages: messagesReducer,
    },
})