import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";


export const imagesSlice = createApi({
    reducerPath: "images",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
    endpoints: (builder) => ({
        getImages: builder.query({
            query: () => ({
                url: "api/images",
                method: "GET",
            }),
        }),
        getImage: builder.query({
            query: (id) => ({
                url: `api/images/${id}`,
                method: "GET",
            }),
        }),
        addImage: builder.mutation({
            query: (formData) => ({
                url: "api/images",
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }),
        }),
        updateImage: builder.mutation({
            // query: ({ id, title, description, owner, technologies, link }) => ({
            //     url: `/api/images/${id}`,
            //     method: "PUT",
            //     body: { title, description, owner, technologies, link },
            //     headers: {
            //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            //     },
            // }),
        }),
        deleteImage: builder.mutation({
            query: (id) => ({
                url: `/api/images/${id}`,
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }),
        }),
    }),
});


export const {
    useGetImagesQuery,
    useGetImageQuery,
    useAddImageMutation,
    useUpdateImageMutation,
    useDeleteImageMutation,
} = imagesSlice;