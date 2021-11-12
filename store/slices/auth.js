import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    loading: false,
    doneSettingInitialState: false,

    token: null,
    email: null,
    firstName: null,
    lastName: null,
    profileImage: null,

    unverifiedUserId: null,
}

const authSlice = createSlice({
    initialState,
    name: 'auth',
    reducers: {
        loading(state, action) {
            state.loading = action.payload
        },

        success(state, action) {
            const payload = action.payload
            for (let property in payload) {
                state[property] = payload[property]
            }

            let newAuthData = {
                token: state.token,
                email: state.email,
                firstName: state.firstName,
                lastName: state.lastName,
                unverifiedUserId: state.unverifiedUserId,
            }
            localStorage.setItem('authData', JSON.stringify(newAuthData))
        },

        setInitials(state) {
            let authData = JSON.parse(localStorage.getItem('authData'))
            if (authData){
                for (let property in authData) {
                    state[property] = authData[property]
                }
            }
            state.doneSettingInitialState = true
        },

        logout(state) {
            localStorage.removeItem('authData')
            for (let property in state) {
                state[property] = null
            }
            state.loading = false
            state.doneSettingInitialState = true
        }
    },
})


export const authActions = authSlice.actions

export default authSlice.reducer