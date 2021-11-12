import { socket } from '#sockets/index'
import { getCurrentChatId } from '#helpers/url'
import { handleError } from '#store/helpers/error'
import { FetchChats } from '#store/actionCreators/chats'
import { chatsActions } from '../slices/chats'
import { messagesActions } from '../slices/messages'


export const InitializeSocketEvents = (payload) => {
    const { router } = payload
    return async (dispatch, getState) => {
        try {
            let Socket = socket.getIO()
            if (!Socket) {
                const token = getState().auth.token
                Socket = socket.init(token)
                Socket.on('chats', async (data) => {
                    await dispatch(chatsActions.update({ data, loading: false }))
                })
                Socket.on('messages', async (data) => {
                    await dispatch(messagesActions.update({ data, loading: false }))
                })
                Socket.on('newMessage', async (data) => {
                    await dispatch(chatsActions.addChat(data))
                    const currentChatId = getCurrentChatId()
                    if (currentChatId && currentChatId === data._id) {
                        await dispatch(messagesActions.addMessage(data.lastMessage))
                    }
                })
                Socket.on('newChat', async (data) => {
                    await router.push(`/messages/${data._id}`)
                })
                await dispatch(FetchChats())
            }
        } 
        catch (error) {
            handleError(dispatch, error)
        }
    }
}