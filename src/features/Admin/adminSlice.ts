import { createAsyncThunk } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import type { Product } from '../../app/api'

export interface ProductState {
  items:  Product[]
}

const initialState: ProductState = {
    items: []
}

export const addProductThunk = createAsyncThunk('products/add', async(newProduct: Product) => {
    //const res = await fetch(`http://localhost:5173/data/products.json`);
    //const product = await res.json();
    //const product = newProduct
    return{
        product: newProduct 
    }
});

export const fetchProductThunk = createAsyncThunk('products/fetch', async() => {
    //const res = await fetch(`http://localhost:5173/data/products.json`);
    const res = await fetch(`http://localhost:8080/api/v1/product/`);
    const products = await res.json();
    return{
        products
    }
});

const adminSlice = createSlice({
  name: 'addproduct',
  initialState,
  reducers: {
/*     addProduct(state, action: PayloadAction<Product[]>) {
    } */
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductThunk.fulfilled, (state, action) => {
        state.items = action.payload.products
    })

    builder.addCase(addProductThunk.fulfilled, (state, action) => {
        state.items = [action.payload.product, ...state.items]
    })
  }
})

//export const { addProduct } = adminSlice.actions
export default adminSlice.reducer
