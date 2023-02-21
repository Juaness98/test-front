import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        createUser: (state, action) => {
            state.push(action.payload)
        },
        updateTask: (state, action) => {
            const {id, title, description} = action.payload
            const task = state.find((task) => task.id === id)
            if (task) {
                task.title = title
                task.description = description
            }
        },
        deleteTask: (state, action) => {
            const index = state.findIndex((task) => task.id === action.payload)
            state.splice(index, 1)
        }
    }
})

export const {createUser} = userSlice.actions
export default userSlice.reducer
