import axios from 'axios'

import { socket } from '#sockets/index'
import { authActions } from '../slices/auth'
import { gqlEndpoint } from '../../settings'
import { InitializeSocketEvents } from './socket'
import { handleError } from '#store/helpers/error'


export const LoginUser = (payload) => {
    const { 
        email,
        password,
        router,
    } = payload
    return async dispatch => {
        try {
            await dispatch(authActions.loading(true))
            const graphqlQuery = {
                query: `query LoginUser($loginInput: LoginInput!) {
                    login(loginInput: $loginInput) {
                        token
                        firstName
                        lastName
                    }
                }`,
                variables: {
                    loginInput: {
                        email,
                        password,
                    }
                }
            }
            const response = await axios.post(
                gqlEndpoint,
                JSON.stringify(graphqlQuery),
                {
                    timeout: 30000,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            console.log(response.data)
            if (response.data.errors){
                let firstError = response.data.errors[0]
                throw new Error(firstError.message)
            }
            const queryData = response.data.data.login
            await dispatch(authActions.success({
                email,
                loading: false,
                token: queryData.token,
                firstName: queryData.firstName,
                lastName: queryData.lastName,
            }))
            await dispatch(InitializeSocketEvents({ router }))
            router.push('/')
        } 
        catch (error) {
            handleError(dispatch, error)
            dispatch(authActions.loading(false))
        }
    }
}

export const LogoutUser = () => {
    return async (dispatch, getState) => {
        try {
            const token = getState().auth.token
            await dispatch(authActions.loading(true))
            const graphqlQuery = {
                query: `query LogoutUser {
                    logout
                }`
            }
            const response = await axios.post(
                gqlEndpoint,
                JSON.stringify(graphqlQuery),
                {
                    timeout: 30000,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    }
                }
            )
            console.log(response.data)
            if (response.data.errors){
                let firstError = response.data.errors[0]
                throw new Error(firstError.message)
            }
        } 
        catch (error) {
            console.log(error)
            console.log(error.response)
        }
        finally {
            socket.disconnect()
            dispatch(authActions.logout())
        }
    }
}

export const SignUpUser = (payload) => {
    const { 
        email,
        password,
        firstName, 
        lastName,
        router,
    } = payload
    return async dispatch => {
        try {
            dispatch(authActions.loading(true))
            const graphqlQuery = {
                query: `mutation SignUpUser($signUpInput: SignUpInput!) {
                    signUp(signUpInput: $signUpInput) {
                        _id
                    }
                }`,
                variables: {
                    signUpInput: {
                        email,
                        password,
                        firstName,
                        lastName,
                    }
                }
            }
            const response = await axios.post(
                gqlEndpoint,
                JSON.stringify(graphqlQuery),
                {
                    timeout: 30000,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            )
            console.log(response.data)
            if (response.data.errors){
                throw new Error(response.data.errors[0].message)
            }
            const queryData = response.data.data.signUp
            await dispatch(authActions.success({
                email,
                firstName,
                lastName,
                loading: false,
                unverifiedUserId: queryData._id,
            }))
            router.push('/auth/verify')
        } 
        catch (error) {
            handleError(dispatch, error)
            dispatch(authActions.loading(false))
        }
    }
}

export const VerifyUserEmail = (payload) => {
    const { 
        otp,
        router,
    } = payload
    return async (dispatch, getState) => {
        const _id = getState().auth.unverifiedUserId
        try {
            dispatch(authActions.loading(true))
            const graphqlQuery = {
                query: `mutation VerifyUser($verifyEmailInput: VerifyEmailInput!) {
                    verifyEmail(verifyEmailInput: $verifyEmailInput) {
                        token
                    }
                }`,
                variables: {
                    verifyEmailInput: {
                        _id,
                        otp,
                    }
                }
            }
            const response = await axios.post(
                gqlEndpoint,
                JSON.stringify(graphqlQuery),
                {
                    timeout: 30000,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            )
            console.log(response.data)
            if (response.data.errors){
                throw new Error(response.data.errors[0].message)
            }
            const queryData = response.data.data.verifyEmail
            await dispatch(authActions.success({ 
                loading: false,
                token: queryData.token,
            }))
            await dispatch(InitializeSocketEvents({ router }))
            router.push('/')
        } 
        catch (error) {
            handleError(dispatch, error)
            dispatch(authActions.loading(false))
        }
    }
}