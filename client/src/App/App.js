import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRouteAdmin from "./components/ui/protecredRouteAdmin.jsx";
import ProtectedRoute from "./components/ui/protectedRoute";
// http://localhost:8080/api

import Login from "./loyauts/login";
import AdminPage from "./pages/AdminPage.jsx";
import Cart from "./pages/Cart";
import CommentsPage from "./pages/CommetnsPage.jsx";

import MainPage from "./pages/MainPage";
import ProductPage from "./pages/ProductPage.jsx";

function App() {
    return (
        <div className="wrapper">
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
                <Route
                    path="admin"
                    element={
                        <ProtectedRouteAdmin>
                            <AdminPage />
                        </ProtectedRouteAdmin>
                    }
                />
                <Route path="/" element={<MainPage />} />
                <Route path="/:productId" element={<ProductPage />}>
                    <Route path="comments" element={<CommentsPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;
