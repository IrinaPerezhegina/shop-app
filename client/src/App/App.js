import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
// import Header from "./components/ui/Header/header";
// import Header from "./components/ui/Header/header";
// import LoginForm from "./components/ui/LoginRegister/loginForm";
import Login from "./loyauts/login";

import MainPage from "./pages/MainPage";

function App() {
    return (
        <div className="wrapper">
            <Routes>
                <Route path="login/:type?" element={<Login />} />
                <Route path="register" element={<Login />} />
                <Route path="/" element={<MainPage />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
}

export default App;
