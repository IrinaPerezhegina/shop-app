import { createAction, createSlice } from "@reduxjs/toolkit";
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
        },
        updateProductRecieved: (state, action) => {
            const elementIndex = state.entities.findIndex(
                (el) => el._id === action.payload.productId
            );
            const date = {
                rating: action.payload.rating,
                numReviews: action.payload.numReviews
            };

            state.entities[elementIndex] = {
                ...state.entities[elementIndex],
                ...date
            };
        },
        updateProductFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        createProductRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        createProductReceived: (state, action) => {
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        removeProductReceived: (state, action) => {
            state.entities = state.entities.filter(
                (el) => el._id !== action.payload
            );
        },
        removeProductRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        updateProductChange: (state, action) => {
            console.log(action);
            const elementIndex = state.entities.findIndex(
                (el) => el._id === action.payload._id
            );
            state.entities[elementIndex] = {
                ...state.entities[elementIndex],
                ...action.payload
            };
        }
    }
});

const { reducer: productsReducer, actions } = productsSlice;
const {
    updateProductChange,
    removeProductRequestFiled,
    removeProductReceived,
    createProductReceived,
    createProductRequestFiled,
    productsRequested,
    productsRecieved,
    productsRequestFiled,
    productDetailsRequested,
    productDetailsRecieved,
    productDetailsRequestFiled,
    updateProductRecieved,
    updateProductFailed
} = actions;
const createProductRequested = createAction("products/createProductRequested");
const removeProductRequested = createAction("products/removeProductRequested");

export const updateAllProduct = (payload, productId) => async (dispatch) => {
    try {
        await productsService.update(payload, productId);
        dispatch(updateProductChange(payload));
    } catch (error) {
        dispatch(updateProductFailed(error.message));
    }
};

export const removeProduct = (productId) => async (dispatch) => {
    dispatch(removeProductRequested());
    try {
        const content = await productsService.removeProduct(productId);

        if (!content) {
            dispatch(removeProductReceived(productId));
        }
    } catch (error) {
        dispatch(removeProductRequestFiled(error.message));
    }
};

export const createProduct = (payload) => async (dispatch) => {
    dispatch(createProductRequested());
    try {
        const content = await productsService.createProduct(payload);
        dispatch(createProductReceived(content));
        console.log(content);
    } catch (error) {
        dispatch(createProductRequestFiled(error.message));
    }
};

export const updateProduct =
    (payload, productId) => async (dispatch, getState) => {
        try {
            const content = await productsService.update(payload, productId);
            console.log(content);
            dispatch(updateProductRecieved({ ...payload, productId }));
        } catch (error) {
            dispatch(updateProductFailed(error.message));
        }
    };

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
