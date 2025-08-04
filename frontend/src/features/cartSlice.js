import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items : JSON.parse(localStorage.getItem('cart')) || []
};

const cartSlice = createSlice({
    name : 'cart',
    initialState ,
    reducers : {
        addToCart : (state , action) => {
            const item = state.items.find(p => p.id === action.payload.id);

            if(item){
                item.quantity += 1;
            }else{
                state.items.push({...action.payload , quantity : 1});
            }
            localStorage.setItem('cart' , JSON.stringify(state.items));
        },
        clearCart : (state) => {
            state.items = [];
            localStorage.removeItem('cart');
        }
    }
})

export const {addToCart , clearCart} = cartSlice.actions;
export default cartSlice.reducer;