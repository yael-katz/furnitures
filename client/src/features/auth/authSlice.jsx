import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token") || "",
        isUserLoggedIn: localStorage.getItem("token") ? true : false,
        userFullName: ""
    },
    reducers: {
        setToken: (state, action) => {
          
            console.log(action.payload.accesToken," tttttttttttoooooooooooooooooooookkkkkkkkkkkkkkkkkeeeeeeeeen");
            const token = action.payload.accesToken
            state.token = token
            state.isUserLoggedIn = true
            localStorage.setItem("token", token)

        },
        removeToken: (state) => {
            state.token = ""
            state.isUserLoggedIn = false
            localStorage.removeItem("token")
        }

        
    }
})
export default authSlice.reducer
export const { setToken, removeToken } = authSlice.actions