import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axios-orders";
import firebase from "../Firebase/firebase";

export const orderSlice = createSlice({
    name: "order",
    initialState: {
        orders: [],
        storing: false,
        purchased: false,
    },
    reducers: {
        purchaseStart: (state) => {
            state.storing = true;
        },
        purchaseSuccess: (state, action) => {
            firebase.analytics().logEvent("Burger purchased");
            state.storing = false;
            state.purchased = true;
            action.payload.orderData.id = action.payload.id;
            state.orders.push(action.payload.orderData);
        },
        purchaseFail: (state) => {
            state.storing = false;
        },
        purchaseInit: (state) => {
            state.purchased = false;
        },
        deleteOrder: (state, action) => {
            state.orders = state.orders.filter((p) => p.id !== action.payload.id);
        },
    },
});

export const { purchaseStart, purchaseSuccess, purchaseFail, purchaseInit, deleteOrder } = orderSlice.actions;

export const purchaseBurger = (orderData, token) => {
    return (dispatch) => {
        dispatch(purchaseStart());
        axios
            .post("/orders.json", orderData)
            .then((response) => {
                dispatch(purchaseSuccess({ id: response.data.name, orderData: orderData }));
            })
            .catch((error) => {
                dispatch(purchaseFail());
            });
    };
};

export default orderSlice.reducer;
