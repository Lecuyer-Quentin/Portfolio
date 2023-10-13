import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const initialState = {
  accessToken: localStorage.getItem('accessToken') || '', 
  refreshToken: localStorage.getItem('refreshToken') || '',
  currentUser: localStorage.getItem('user') || '',
  roles: '',
  id: '',
  isAuthenticated: false,
  status: 'idle',
  error: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.accessToken = action.payload;
      state.refreshToken = action.payload;
      localStorage.setItem('accessToken', action.payload);
      localStorage.setItem('refreshToken', action.payload);
      state.isAuthenticated = true;
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.roles = action.payload;
      localStorage.setItem('user', action.payload);
    },
    logout: (state) => {
      localStorage.removeItem('accessToken', 'refreshToken', 'user');
      state.accessToken = null;
      state.refreshToken = null;
      state.currentUser = null;
      state.isAuthenticated = false;
      //! This is a hack to force a page reload on logout
      if (state.accessToken === null) {
        window.location.reload();
        alert('You have been logged out');
      }
    },
  },
 
});


export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: '/auth',
        method: 'POST',
        body: { username, password },
      }),
      transformResponse: (response) => {
        const {_id, accessToken, refreshToken, roles, username} = response;
        return {_id, accessToken, refreshToken, roles, username}
      },
    }),
    register: builder.mutation({
      query: ({ username, password }) => ({
        url: '/register',
        method: 'POST',
        body: { username, password },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } = authApi;
export const { setAuth, setUser, logout } = authSlice.actions;

// export const authReducer = authSlice.reducer;

//selectors
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;


// export const selectState = (state) => state;
// export const selectAuth = (state) => state.auth;
// export const selectRoles = (state) => state.auth.roles;
// export const selectId = (state) => state.auth.id;
// export const selectStatus = (state) => state.auth.status;
// export const selectError = (state) => state.auth.error;



// export const getState = (state) => state;
// export default authSlice.reducer;











