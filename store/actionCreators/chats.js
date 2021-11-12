import axios from 'axios'

import { socket } from '../../sockets'
import { gqlEndpoint } from '../../settings'
import { chatsActions } from '../slices/chats'
import { handleError } from '#store/helpers/error'


export const FetchChats = () => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token
            await dispatch(chatsActions.loading(true))
            const Socket = socket.getIO()
            Socket.emit('fetchChats', { token })
        } 
        catch (error) {
            handleError(dispatch, error)
            dispatch(chatsActions.loading(false))
        }
    }
}

export const AddChat = (payload) => {
    const { 
        participant,
    } = payload
    return async (dispatch, getState) => {
        try {
            const Socket = socket.getIO()
            let token = getState().auth.token
            Socket.emit('addChat', { token, participant })
        } 
        catch (error) {
            handleError(dispatch, error)
        }
    }
}

export const SearchEmails = (payload) => {
    const {
        email,
        _setData,
    } = payload
    return async (dispatch, getState) => {
        try {
            _setData({ loading: true })
            const token = getState().auth.token
            const graphqlQuery = {
                query: `query SearchEmails($email: String!) {
                    searchEmails(email: $email) {
                        _id
                        email
                        firstName
                        lastName
                    }
                }`,
                variables: {
                    email,
                }
            }
            const response = await axios.post(
                gqlEndpoint,
                JSON.stringify(graphqlQuery),
                {
                    timeout: 30000,
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                }
            )
            console.log(response.data)
            if (response.data.errors){
                let firstError = response.data.errors[0]
                throw new Error(firstError.message)
            }
            _setData({ 
                loading: false,
                searchData: response.data.data.searchEmails,
            })
        } 
        catch (error) {
            handleError(dispatch, error)
            _setData({ loading: false })
        }
    }
}