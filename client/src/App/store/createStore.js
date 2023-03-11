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
import commentsReducer from "./comments";
import usersListReducer from "./usersList";

const rootReducer = combineReducers({
    products: productsReducer,
    user: userReducer,
    colors: colorsReducer,
    images: imagesReducer,
    comments: commentsReducer,
    usersList: usersListReducer
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
