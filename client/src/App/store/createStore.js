import {
    createStore,
    combineReducers,
    applyMiddleware
} from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import productsReducer from "./products";
import userReducer from "./user";
import colorsReducer from "./colors";
import imagesReducer from "./images";

const rootReducer = combineReducers({
    products: productsReducer,
    user: userReducer,
    colors: colorsReducer,
    images: imagesReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
