import { createSlice } from "@reduxjs/toolkit";
import axios from "../../axios-orders";

function change(state, action, value) {
    state.ingredients[action.payload] += value;
    state.totalPrice = state.totalPrice + state.prices[action.payload] * value;
    state.purchaseable = Object.values(state.ingredients).reduce((a, b) => a + b) > 0;
}

export const burgerSlice = createSlice({
    name: "burger",
    initialState: {
        totalPrice: 4,
        ingredients: null,
        purchaseable: false,
        prices: null,
    },
    reducers: {
        addIngredient: (state, action) => {
            change(state, action, 1);
        },
        removeIngredient: (state, action) => {
            if (state.ingredients[action.payload] > 0) {
                change(state, action, -1);
            }
        },
        setIngredients: (state, action) => {
            state.ingredients = action.payload;
            state.purchaseable = false;
            state.totalPrice = 4;
        },
        setPrices: (state, action) => {
            state.prices = action.payload;
        },
    },
});

export const { addIngredient, removeIngredient, setIngredients, setPrices } = burgerSlice.actions;

export const initIngredients = () => (dispatch) => {
    axios
        .get("ingredients.json")
        .then((response) => {
            dispatch(setIngredients(response.data));
        })
        .catch();
};

export const initPrices = () => (dispatch) => {
    axios
        .get("prices.json")
        .then((response) => {
            dispatch(setPrices(response.data));
        })
        .catch();
};

export default burgerSlice.reducer;
