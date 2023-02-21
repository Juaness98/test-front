import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userInfo: {}, // for user object
    userToken: null, // for storing the JWT
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        createAuth: (state, action) => {
            console.log(action.payload.data)
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
