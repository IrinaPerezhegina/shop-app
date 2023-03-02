import React from "react";
import ReactDOM from "react-dom/client";
import "./App/scss/libs/index.scss";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./App/store/createStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    </BrowserRouter>
);
