import apiSlice from "../../app/apiSlice";

const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getProducts: build.query({
            query: () => ({
                url: "/api/products"
            }),
            providesTags: ["Products"]
        }),
        addProductItem: build.mutation({
            query: (product) => ({
                url: "/api/products",
                method: "POST",
                body: product
            }),
            invalidatesTags: ["Products"]
        }),
        updateProduct: build.mutation({
            query: (product) => ({
                url: "/api/products",
                method:"PUT",
                body: product
            }),
            providesTags: ["Products"]
        }),
        deleteProduct: build.mutation({
            query: (_id) => ({
                url: `/api/products/${_id}`,
                method:"DELETE",
            }),
            invalidatesTags: ["Products"]
        }),
    })
})


export const { useGetProductsQuery, useAddProductItemMutation ,useUpdateProductMutation,useDeleteProductMutation} = productsApiSlice

