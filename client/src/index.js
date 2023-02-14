import React from "react";
import ReactDOM from "react-dom/client";
import "./App/scss/libs/index.scss";
import "bootstrap/dist/css/bootstrap.css";

import App from "./App/App";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "./App/store/createStore";
import { Provider } from "react-redux";

const store = createStore();

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
