import { createSlice } from "@reduxjs/toolkit";
import productsService from "../service/products.service";

const productsSlice = createSlice({
    name: "products",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        // productLoading: true,
        product: { reviews: [] }
    },
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true;
        },
        productsRecieved: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        productsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
        // productDetailsRequested: (state) => {
        //     state.productLoading = true;
        // },
        // productDetailsRecieved: (state, action) => {
        //     state.product = action.payload;
        //     state.productLoading = false;
        // },
        // productDetailsRequestFiled: (state, action) => {
        //     state.error = action.payload;
        //     state.productLoading = false;
        // }
    }
});

const { reducer: productsReducer, actions } = productsSlice;
const {
    productsRequested,
    productsRecieved,
    productsRequestFiled,
    productDetailsRequested,
    productDetailsRecieved,
    productDetailsRequestFiled
} = actions;

export const loadProductsList = () => async (dispatch) => {
    try {
        dispatch(productsRequested());
        const content = await productsService.fetchAll();
        dispatch(productsRecieved(content));
    } catch (error) {
        dispatch(productsRequestFiled(error.message));
    }
};

export const loadProductDetails = (productId) => async (dispatch) => {
    try {
        dispatch(productDetailsRequested());
        const content = await productsService.getProduct(productId);
        dispatch(productDetailsRecieved(content));
    } catch (error) {
        dispatch(productDetailsRequestFiled(error.message));
    }
};

export const getProductsList = () => (state) => {
    return state.products.entities;
};
export const getProductsLoadingStatus = () => (state) =>
    state.products.isLoading;

export const getProductById = (productId) => (state) => {
    let getProductById = [];
    if (state.products.entities) {
        getProductById = state.products.entities.find(
            (prod) => prod._id === productId
        );
    }

    return getProductById;
};

export default productsReducer;
