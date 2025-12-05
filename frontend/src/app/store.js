import {configureStore} from '@reduxjs/toolkit'

import cartReducer from '../features/cart/cartSlice'
import authReducer from '../features/auth/authSlice'
import productSlice from '../features/products/productsSlice'

const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        product: productSlice,
    }
})

export default store;