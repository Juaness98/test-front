import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userInfo: {},
    userToken: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        createAuth: (state, action) => {
            const {user, token} = action.payload
            state.userInfo = user
            state.userToken = token
        },
        closeAuth: (state, action) => {
            state = initialState
        }
    }
})

export const {createAuth, closeAuth} = authSlice.actions
export default authSlice.reducer
