import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AppLoader from "./components/ui/hoc/appLoader.jsx";
import ProtectedRoute from "./components/ui/protectedRoute";

// import Header from "./components/ui/Header/header";
// import Header from "./components/ui/Header/header";
// import LoginForm from "./components/ui/LoginRegister/loginForm";
import Login from "./loyauts/login";
import Cart from "./pages/Cart";
import CommentsPage from "./pages/CommetnsPage.jsx";

import MainPage from "./pages/MainPage";
import ProductPage from "./pages/ProductPage.jsx";

function App() {
    return (
        <div className="wrapper">
            <AppLoader>
                <Routes>
                    <Route
                        path="login/:type?"
                        element={
                            <ProtectedRoute>
                                <Login />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="register"
                        element={
                            <ProtectedRoute>
                                <Login />
                            </ProtectedRoute>
                        }
                    />

                    <Route path="cart" element={<Cart />} />
                    <Route path="/" element={<MainPage />} />
                    <Route path="/:id" element={<ProductPage />}>
                        <Route path="comments" element={<CommentsPage />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </AppLoader>
        </div>
    );
}

export default App;
