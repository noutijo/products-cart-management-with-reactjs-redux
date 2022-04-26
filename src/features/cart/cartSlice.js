import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: false
};

export const getCartItems = createAsyncThunk("cart/getCartItems", async (payload, { rejectWithValue, getState, dispatch }) => {

    try {
        const { data } = await axios(url);
        return data;

    } catch (error) {
        return rejectWithValue("Something went wrong!");
    }

});

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state, action) => {
            const idItem = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== idItem);
        },
        increase: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount + 1;
        },
        decrease: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount - 1;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach(item => {
                amount += item.amount;
                total += item.amount * item.price;
            });
 
            state.amount = amount;
            state.total = total;
        }
    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
            state.isLoading = true;
        },
        [getCartItems.fulfilled]: (state, { payload }) => {
            state.cartItems = payload;
            state.isLoading = false;
        },
        [getCartItems.rejected]: (state, action) => {
            console.log(action);
            state.isLoading = false;
        }
    }
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;
