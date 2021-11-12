import { socket } from '../../sockets'
import { handleError } from '#store/helpers/error'
import { messagesActions } from '../slices/messages'


export const FetchMessages = (payload) => {
    const { 
        chatId,
    } = payload
    return async (dispatch, getState) => {
        try {
            await dispatch(messagesActions.loading(true))
            let token = getState().auth.token
            const Socket = socket.getIO()
            Socket.emit('fetchMessages', { token, chatId })
        } 
        catch (error) {
            handleError(dispatch, error)
            dispatch(messagesActions.loading(false))
        }
    }
}

export const AddMessage = (payload) => {
    const { 
        chatId,
        message,
    } = payload
    return async (dispatch, getState) => {
        try {
            let token = getState().auth.token
            const Socket = socket.getIO()
            Socket.emit('addMessage', { token, chatId, message })
        } 
        catch (error) {
            handleError(dispatch, error)
        }
    }
}