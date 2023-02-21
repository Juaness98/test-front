import {configureStore} from '@reduxjs/toolkit'
import usersReducer from "../features/userSlice";
import authReducer from "../features/authSlice";
import companyReducer from "../features/companySlice";

export const store = configureStore({
    reducer: {
        users: usersReducer,
        auth: authReducer,
        companies: companyReducer
    }
})