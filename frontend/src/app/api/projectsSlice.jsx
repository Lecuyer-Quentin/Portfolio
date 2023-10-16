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
                    // 'Content-Type': 'multipart/form-data',
                    'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
                    'Content-Disposition': 'form-data',
                    

                },
            }),
        }),
        updateProject: builder.mutation({
            query: ({ id, name, description, owner, images, technologies, link }) => ({
                url: `/api/projects/${id}`,
                method: 'PUT',
                body: { name, description, owner, images, technologies, link },
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