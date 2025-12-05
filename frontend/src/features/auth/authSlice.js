import {createSlice} from '@reduxjs/toolkit'

const storedUser = localStorage.getItem('user');
const storedAccessToken = localStorage.getItem('access_token');
const storedRefreshToken = localStorage.getItem('refresh_token');

const initialState = {
    user: storedUser ? JSON.parse(storedUser) : null,
    access_token: storedAccessToken || null,
    refresh_token: storedRefreshToken || null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loginUser(state, action){
            state.user = action.payload.user;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;

            localStorage.setItem('user', action.payload.user);
            localStorage.setItem('refresh_token', action.payload.refresh_token);
            localStorage.setItem('access_token', action.payload.access_token);
        },

        logoutUser(state){
            state.user = null;
            state.access_token = null;
            state.refresh_token = null;

            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
        },

        updateUserProfile(state, action) {
            state.user = {...state.user, ...action.payload};
            localStorage.setItem('user', JSON.stringify(state.user));
        }
    }
});

// Export actions to use in components
export const {loginUser, logoutUser, updateUserProfile} = authSlice.actions;

// Export Reducer to use in Store
export default authSlice.reducer;