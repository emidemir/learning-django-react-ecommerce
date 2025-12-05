import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

/*
 * ASYNC THUNK EXPLAINED:
 * ----------------------
 * 1. WHAT: A Redux Toolkit function to handle async operations (like API calls) that normal reducers can't handle.
 * 2. HOW: It wraps a Promise and automatically dispatches 3 lifecycle actions based on the result:
 * - pending:   The request has started (set loading: true).
 * - fulfilled: The request succeeded (save data to state).
 * - rejected:  The request failed (save error message).
 * 3. USAGE: Since these actions are generated automatically, we listen for them in 'extraReducers'.
 */
// export const fetchProducts = createAsyncThunk(...);

const MOCK_PRODUCTS = [
    { id: 1, title: 'Wireless Noise Canceling Headphones', category: 'Electronics', price: 299.99, rating: 4.5, reviewCount: 120, image: 'https://via.placeholder.com/300' },
    { id: 2, title: 'Ergonomic Office Chair', category: 'Furniture', price: 159.00, rating: 4.0, reviewCount: 85, image: 'https://via.placeholder.com/300' },
    { id: 3, title: 'Mechanical Gaming Keyboard', category: 'Electronics', price: 89.99, rating: 4.8, reviewCount: 230, image: 'https://via.placeholder.com/300' },
    { id: 4, title: 'Stainless Steel Water Bottle', category: 'Home', price: 24.50, rating: 4.2, reviewCount: 45, image: 'https://via.placeholder.com/300' },
];

// ASYCN THUNK
export const fetchProducts = createAsyncThunk('products/fetchProducts', async() => {
    return new Promise((resolve) => {
        setTimeout(()=>{
            resolve(MOCK_PRODUCTS);
        }, 1000);
    });
});

// INITIAL STATE
const initialState = {
    items: [],
    status: 'idle',
    error: null,
};

// SLICE
const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        sortByPrice: (state) => {
            state.items.sort((a,b) => a.price - b.price);
        }
    },

    // builder.addCase( [The Action To Listen For], [The Function To Run] )
    // The Action: fetchProducts.fulfilled (The specific signal sent when the Promise resolves).
    // The Function: (state, action) => { ... } (The code that updates the state).
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.status = 'loading';
        })
        .addCase(fetchProducts.fulfilled, (state, action)=>{
            state.status = 'succeeded';
            state.items = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action)=> {
            state.status = 'failed';
            state.error = action.payload;
        })

    }
})

// Selectors
export const selectAllProducts = (state) => state.products.items;
export const selectProductStatus = (state) => state.products.status;
export const selectProductById = (state, productId) => state.products.items.find(product => product.id === parseInt(productId));

// Export actions to use in components
export const {sortByPrice} = productsSlice.actions;

// Export Reducer to use in store
export default productsSlice.reducer;