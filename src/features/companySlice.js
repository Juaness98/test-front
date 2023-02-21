import {createSlice} from '@reduxjs/toolkit'

export const companySlice = createSlice({
    name: 'companies',
    initialState: [],
    reducers: {
        createCompany: (state, action) => {
            state.push(action.payload)
        }
    }
})

export const {createCompany} = companySlice.actions
export default companySlice.reducer
