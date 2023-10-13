import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const usersSlice = createApi({
    reducerPath: 'users',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => ({
                url: 'api/users',
                method: 'GET',
            }),
        }),
        getUser: builder.query({
            query: (id) => ({
                url: `api/users/${id}`,
                method: 'GET',
            }),
        }),
        addUser: builder.mutation({
            query: ({ username, email, password }) => ({
                url: '/api/users',
                method: 'POST',
                body: { username, email, password },
            }),
        }),
        updateUser: builder.mutation({
            query: ({ id, username, email, password }) => ({
                url: `/api/users/${id}`,
                method: 'PUT',
                body: { username, email, password },
            }),
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `/api/users/${id}`,
                method: 'DELETE',
            }),
        }),
    }),

});

export const {
    useGetUsersQuery,
    useGetUserQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = usersSlice;


