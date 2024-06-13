import apiSlice from "../../app/apiSlice";

const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getOrders: build.query({
            query: () => ({
                url: "/api/orders"
            }),
            providesTags: ["Orders"]
        }),
        addOrder: build.mutation({
            query: (order) => ({
                url: "/api/orders",
                method: "POST",
                body: order
            }),
            providesTags:["NewOrd"],
            invalidatesTags: ["Cart"]
        }),
        updateOrder: build.mutation({
            query: (order) => ({
                url: "/api/orders",
                method:"PUT",
                body: order
            }),
            providesTags: ["Orders"]
        }),
        deleteOrder: build.mutation({
            query: (_id) => ({
                url: `/api/orders/${_id}`,
                method:"DELETE",
              
            }),
            providesTags: ["orders"]
        }),
    })
})


export const { useGetOrdersQuery, useAddOrderMutation ,useUpdateOrderMutation,useDeleteOrderMutation} = ordersApiSlice

