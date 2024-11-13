import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: null,
};
//REGISTERED USER 
export const registerUser = createAsyncThunk(
    "/auth/register",
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", formData, { withCredentials: true });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Registration failed" });
        }
    }
);

//AUTHORIZING THE USER BY PROVINDING ACCESS TOKEN IN COOKIES
export const loginUser = createAsyncThunk(
    "/auth/login",

    async (formData) => {
        const response = await axios.post(
            "http://localhost:5000/api/auth/login",
            formData,
            {
                withCredentials: true,
            }
        );
        return response.data;
    }
);

//LOGGING OUT USER BY REMOVING ACCESS TOKEN FROM COOKIES
export const logoutUser = createAsyncThunk('/auth/logout',
    async () => {
        const response = await axios.post('http://localhost:5000/api/auth/logout',
            {
                withCredentials: true
            }
        )
        console.log(response.data);

        return response.data
    }
)

//CHECKING THE ACCESS TOKEN IN COOKIES AND MATHCING WITH BACKEND PROVIDED TOKEN
export const checkauth = createAsyncThunk('/auth/checkauth',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:5000/api/auth/checkauth', {
                withCredentials: true,
                headers: {
                    "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Authorization Failed" });
        }
    }
);


const authSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setUser: (state, action) => { },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = action.payload.success
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = action.payload.success ? action.payload.success : false;
                state.user = action.payload.success ? action.payload.user : null // Set the user on successful login
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            })
            .addCase(checkauth.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(checkauth.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = action.payload.success ? action.payload.success : false;
                state.user = action.payload.user
            })
            .addCase(checkauth.rejected, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = false
                state.user = null
            })
            .addCase(logoutUser.pending, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = false
                state.user = null
            })
            .addCase(logoutUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = false
                state.user = null
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = false
                state.user = null
            })
    },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
