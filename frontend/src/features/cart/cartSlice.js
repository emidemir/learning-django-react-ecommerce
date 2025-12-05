import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);

            state.totalQuantity++;

            if (!existingItem){
                state.items.push({
                    id: newItem.id,
                    title: newItem.title,
                    price: newItem.price,
                    image: newItem.image,
                    quantity: 1,
                    totalPrice: newItem.price,
                })
            }else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },

        removeItemFromCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find((item) => item.id === newItem.id);

            if (existingItem){
                state.items = state.items.find((item) => item.id !== newItem.id);
                state.totalAmount = state.totalAmount - existingItem.price*existingItem.quantity;
                state.totalQuantity = state.totalQuantity - existingItem.quantity;
            }
        },

        decreaseItemQuantity(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => id === item.id);
            
            if (existingItem.quantity === 1){
                state.items = state.items.find((item) => item.id !== id);
                state.totalQuantity--;
            }else{
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
                state.totalQuantity--;
            }
        },
    }
})

// Export actions to use in components
export const {addItemToCart, removeItemFromCart, decreaseItemQuantity} = cartSlice.actions;

// Export reducer to use in Store
export default cartSlice.reducer;