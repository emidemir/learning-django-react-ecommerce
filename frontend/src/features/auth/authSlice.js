import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userName: '',
    token: '',
    email: '',
    fullName: '',
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState: initialState,
    reducers: {
        loginUser: (state, action) => {
            state.userName = action.payload.userName;
            state.token = action.payload.access_token;
            state.email = action.payload.email;
            state.fullName = action.payload.fullName
        },
        logoutUser: (state, action) => {
            state.email = null;
            state.fullName = null;
            state.token = null;
            state.userName = null
        }
    }
})

export const {loginUser, logoutUser} = authSlice.actions
export default authSlice.reducer