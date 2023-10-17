import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const projectsSlice = createApi({
    reducerPath: 'projects',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
    endpoints: (builder) => ({
        getProjects: builder.query({
            query: () => ({
                url: 'api/projects',
                method: 'GET',
            }),
        }),
        getProject: builder.query({
            query: (id) => ({
                url: `api/projects/${id}`,
                method: 'GET',
            }),
        }),
        addProject: builder.mutation({
            query: (formData) => ({
                url: 'api/projects',
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            }),
        }),
        updateProject: builder.mutation({
            query: ({ id, title, description, owner, technologies, link }) => ({
                url: `/api/projects/${id}`,
                method: 'PUT',
                body: { title, description, owner, technologies, link },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            }),
        }),
        deleteProject: builder.mutation({
            query: (id) => ({
                url: `/api/projects/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            }),
            
        }),
    }),
});

export const {
    useGetProjectsQuery,
    useGetProjectQuery,
    useAddProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation,
} = projectsSlice;