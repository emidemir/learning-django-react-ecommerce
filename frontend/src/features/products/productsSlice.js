import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    products: [],
}

const productsSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload)
        },

        removeProduct: (state, action) => {
            const index = state.products.indexOf(action.payload)
            state.products.splice(index, 1)
        }
    } 
})

export const {addProduct, removeProduct} = productsSlice.actions
export default productsSlice.reducer