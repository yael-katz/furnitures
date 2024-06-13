import { createSlice } from "@reduxjs/toolkit"

const initVal = {
    role:""
    // userName: 
    // userId:
}

const Slice = createSlice({
    name: "List",
    initialState: initVal,
    reducers: {
        updateRole: (state, action) => {
            state.role = action.payload.data
        }
    }
})
export const { updateRole} = Slice.actions
export default Slice.reducer