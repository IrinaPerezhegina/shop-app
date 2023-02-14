import { createSlice } from "@reduxjs/toolkit";
import productsService from "../service/products.servise";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        isLoggedIn: true,
        dataLoaded: false
    },
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true;
        },
        productsRecieved: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        productsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: productsReducer, actions } = productsSlice;
const { productsRequested, productsRecieved, productsRequestFiled } = actions;

export const loadProductsList = () => async (dispatch) => {
    dispatch(productsRequested());
    try {
        const content = await productsService.fetchAll();
        dispatch(productsRecieved(content));
    } catch (error) {
        dispatch(productsRequestFiled(error.message));
    }
};

export const getProductsList = () => (state) => {
    return state.products.entities;
};
export const getProductsLoadingStatus = () => (state) =>
    state.products.isLoading;
export default productsReducer;
