import apiSlice from "../../app/apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getUsers: build.query({
            query: () => ({
                url: "/api/users"
            }),
            providesTags: ["Users"]
        }),
        getUser: build.query({
            query: () => ({
                url: "/api/users/user"
            }),
            providesTags: ["Users"]
        }),
        // addUserItem: build.mutation({
        //     query: (user) => ({
        //         url: "/api/user",
        //         method: "POST",
        //         body: user
        //     }),
        //     invalidatesTags: ["Users"]
        // }),
        getCart: build.query({
            query: () => ({
                url: "/api/users/cart"
            }),
            providesTags: ["Cart"],
            invalidatesTags:['NewOrd']
        }),
        addUserItem: build.mutation({
            query: (user) => ({
                url: "/api/users",
                method: "POST",
                body: user
            }),
            invalidatesTags: ["Users"]
        }),
        addToCart: build.mutation({
            query: (user) => ({
                url: "/api/users/addToCart",
                method: "PUT",
                body: user
            }),
            invalidatesTags: ["Cart"]
        }),
        updateUser: build.mutation({
            query: (product) => ({
                url: "/api/users",
                method:"PUT",
                body: product
            }),
            invalidatesTags: ["Users"]
        }),
        deleteUser: build.mutation({
            query: (_id) => ({
                url: `/api/users/${_id}`,
                method:"DELETE",
              
            }),
            // providesTags: ["Users"]
            invalidatesTags: ["Users"]
        }),
        
       
    })
})


export const { useGetUsersQuery, useAddUserItemMutation ,useAddToCartMutation,useGetCartQuery,useGetUserQuery,useDeleteUserMutation,useUpdateUserMutation} = usersApiSlice

