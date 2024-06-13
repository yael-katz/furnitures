import { configureStore } from "@reduxjs/toolkit"
import apiSlice from "./apiSlice"
import authSliceReducer from "../features/auth/authSlice"
import slice from './slice'
const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        slice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})
export default store