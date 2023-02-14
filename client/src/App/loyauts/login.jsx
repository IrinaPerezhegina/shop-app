import React from "react";
import Footer from "../components/ui/Footer/footer";
import Header from "../components/ui/Header/header";
import RegisterForm from "../components/ui/LoginRegister/registerForm";
import { useLocation } from "react-router-dom";
import LoginForm from "../components/ui/LoginRegister/loginForm";

const Login = () => {
    const { pathname } = useLocation();
    return (
        <>
            <Header />
            {pathname === "/register" ? <RegisterForm /> : <LoginForm />}
            <Footer />
        </>
    );
};

export default Login;
