import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    isLoading: false,
    productList: []
}

export const addProduct = createAsyncThunk('/products/add-product',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:5000/api/admin/products/add-product", formData,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
            return response?.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Products adding failed" })
        }
    }
)

export const getAllProducts = createAsyncThunk('/products/get-product',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("http://localhost:5000/api/admin/products/get-product")
            return response?.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Products fetching failed" })
        }
    }
)

export const editProduct = createAsyncThunk('/products/edit-product',
    async ({ id, formData }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/admin/products/edit-product/${id}`, formData, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            return response?.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Products editing failed" })
        }
    }
)

export const deleteProduct = createAsyncThunk('/products/delete-product',
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/admin/products/delete-product/${id}`)
            return response?.data
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Products delete failed" })
        }
    }
)



const AdminProductSlice = createSlice({
    name: "adminProducts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllProducts.pending, (state, action) => {
            state.isLoading = true
        }).addCase(getAllProducts.fulfilled, (state, action) => {
            state.isLoading = false
            state.productList = action.payload.data
        }).addCase(getAllProducts.rejected, (state, action) => {
            state.isLoading = false
            state.productList = []
        })
    }
})

export default AdminProductSlice.reducer



// .addCase(addProducts.pending, (state, action) => {
//     state.isLoading = true
// }).addCase(addProducts.fulfilled, (state, action) => {
//     state.isLoading = false
//     state.productList = action.payload
// }).addCase(addProducts.rejected, (state, action) => {
//     state.isLoading = false
//     state.productList = []
// })