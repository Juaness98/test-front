import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        createUser: (state, action) => {
            state.push(action.payload)
        }
    }
})

export const {createUser} = userSlice.actions
export default userSlice.reducer
