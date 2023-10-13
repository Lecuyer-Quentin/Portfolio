import { configureStore } from '@reduxjs/toolkit';
import { authApi, authSlice } from './api/authSlice';
import { projectsSlice } from './api/projectsSlice';
import { usersSlice } from './api/usersSlice';


export const store = configureStore({
    reducer: {
        // auth: authReducer,
        auth: authSlice.reducer,
        authApi: authApi.reducer,
        projects: projectsSlice.reducer,
        users: usersSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            projectsSlice.middleware,
            usersSlice.middleware,
        ),
  
});

export default store;



    



