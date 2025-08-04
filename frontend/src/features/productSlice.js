// features/productSlice.js
import { meta } from "@eslint/js";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetch",
  async () => {
    const res = await axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products");
    return res.data;              // ← return the array itself
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null
  },
  extraReducers: builder => builder
    .addCase(fetchProducts.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.items  = action.payload;  // ← payload is now Array<product>
    })
    .addCase(fetchProducts.rejected, (state, action) => {
      state.status = "failed";
      state.error  = action.error.message;
    })
});

export default productSlice.reducer;
