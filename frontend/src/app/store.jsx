import { configureStore } from '@reduxjs/toolkit';
import { authApi, authSlice } from './api/authSlice';
import { projectsSlice } from './api/projectsSlice';
import { usersSlice } from './api/usersSlice';
import { imagesSlice } from './api/imagesSlice';


export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        authApi: authApi.reducer,
        projects: projectsSlice.reducer,
        users: usersSlice.reducer,
        images: imagesSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            projectsSlice.middleware,
            usersSlice.middleware,
            imagesSlice.middleware,
        ),
  
});

export default store;



    



