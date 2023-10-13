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
            query: ({ name, description, owner, image, technologies, link }) => ({
                url: 'api/projects',
                method: 'POST',
                body: {
                    name,
                    description,
                    owner,
                    image,
                    technologies,
                    link,
                    createdAt: new Date(),
                    updatedAt: new Date(),

                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            }),
        }),
        updateProject: builder.mutation({
            query: ({ id, name, description, owner, image, technologies, link }) => ({
                url: `/api/projects/${id}`,
                method: 'PUT',
                body: { name, description, owner, image, technologies, link },
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