import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productService from "./productService";

const productSlice = createSlice({
    name: "products",
    initialState:{
        allProducts:[],
        product:{},
        productLoading: false,
        productSuccess: false,
        productError: false,
        productErrorMessage: "",
        edit:{
            product:{},
            isEdit: false
        }
    },
    reducers:{ 
        editProduct :(state, action) => {
            return{
                 ...state,
                edit:{product:action.payload, isEdit:true}
            }
        }
    },
    extraReducers: (builder) => {
        builder
        // Get Product Details
        .addCase(getProducts.pending, (state, action)=> {
            state.productLoading = true
            state.productSuccess = false
            state.productError = false
        })
         .addCase(getProducts.fulfilled, (state, action)=> {
            state.productLoading = false
             state.allProducts = action.payload
            state.productSuccess = true
           state.productError = false
        })
         .addCase(getProducts.rejected, (state, action)=> {
            state.productLoading = false
            state.productSuccess = false
            state.productError = true
            state.productErrorMessage = action.payload
        })

        // Get Single Product Details
        .addCase(getProduct.pending, (state, action)=> {
            state.productLoading = true
            state.productSuccess = false
            state.productError = false
        })
         .addCase(getProduct.fulfilled, (state, action)=> {
            state.productLoading = false
             state.product = action.payload
            state.productSuccess = true
           state.productError = false
        })
         .addCase(getProduct.rejected, (state, action)=> {
            state.productLoading = false
            state.productSuccess = false
            state.productError = true
            state.productErrorMessage = action.payload
        })
        // Update product 
        .addCase(updateProduct.pending, (state, action) => {
                state.productLoading = true
                state.productSuccess = false
                state.productError = false
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.productLoading = false
                state.allProducts = state.allProducts.map(product => product._id === action.payload._id ? action.payload : product)
                state.edit = { product: {}, isEdit: false }
                state.productSuccess = true
                state.productError = false
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.productLoading = false
                state.productSuccess = false
                state.productError = true
                state.productErrorMessage = action.payload
            })
             // Add product 
        .addCase(addProduct.pending, (state, action) => {
                state.productLoading = true
                state.productSuccess = false
                state.productError = false
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.productLoading = false
                state.allProducts = [action.payload, ...state.allProducts]
                state.productSuccess = true
                state.productError = false
            })
            .addCase(addProduct.rejected, (state, action) => {
                state.productLoading = false
                state.productSuccess = false
                state.productError = true
                state.productErrorMessage = action.payload
            })
    }
})
export const {editProduct} = productSlice.actions
export default productSlice.reducer

// Fetch products
 export const getProducts = createAsyncThunk("FETCH/PRODUCTS" , async()=>{
    try {
        return await productService.fetchProducts()
    } catch (error) {
              const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    }
 })

 // Fetch product
export const getProduct = createAsyncThunk("FETCH/PRODUCT", async (id, thunkAPI) => {
  try {
    const res = await productService.fetchProduct(id);
    return res;
  } catch (error) {
    const message = error.response?.data?.message || error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// Update Product
export const updateProduct = createAsyncThunk('UPDATE/PRODUCT', async(formData, thunkAPI)=>{
    let token = thunkAPI.getState().auth.user.token
    try {
      return await productService.update(formData, token)
} catch (error) {
    const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    
}
 })

 // Add Product
export const addProduct = createAsyncThunk('ADD/PRODUCT', async(formData, thunkAPI)=>{
 
    let token = thunkAPI.getState().auth.user.token
    try {
      return await productService.add(formData, token)
} catch (error) {
    const message = error.response.data.message
        return thunkAPI.rejectWithValue(message)
    
}
 })