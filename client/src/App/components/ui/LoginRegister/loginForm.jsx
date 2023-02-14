import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../../scss/components/LoginRegister.module.scss";
import Social from "../social";
import * as yup from "yup";

const validateSchema = yup.object().shape({
    password: yup
        .string()
        .required(`Поле 'Password' обязательно для заполнения`)
        .min(8),
    email: yup
        .string()
        .required(`Поле 'Email' обязательно для заполнения`)
        .email()
});

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        validateSchema
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));

        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    console.log(errors);
    const handleSubmit = (e) => {
        console.log(e);
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return e;
    };
    const handleChange = ({ target }) => {
        console.log(target.value);
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    return (
        <div className={styles.container}>
            <section className={styles.form}>
                <div className={styles.formContent}>
                    <h1>Sign In</h1>
                    <p>If you don’t have an account register</p>
                    <p>
                        You can <Link to="/register">Register here!</Link>
                    </p>
                    <form className={styles.formBox} onSubmit={handleSubmit}>
                        <div className={styles.formBoxInputBox}>
                            <label
                                className={styles.formBoxInputBoxInfo}
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <label
                                className={styles.formBoxInputBoxIcon}
                                htmlFor="email"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-envelope"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
                                </svg>
                            </label>
                            <input
                                onChange={handleChange}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your address"
                            />
                            <div
                                className={
                                    errors.email
                                        ? styles.inputError
                                        : "invalid-feedback"
                                }
                            >
                                {errors.email}
                            </div>
                        </div>
                        <div className={styles.formBoxInputBox}>
                            <label
                                className={styles.formBoxInputBoxInfo}
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <label
                                className={styles.formBoxInputBoxIcon}
                                htmlFor="password"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-shield-lock"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
                                    <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z" />
                                </svg>
                            </label>
                            <input
                                onChange={handleChange}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                            />
                            <div
                                className={
                                    errors.password
                                        ? styles.inputError
                                        : "invalid-feedback"
                                }
                            >
                                {errors.password}
                            </div>
                        </div>
                        <div className={styles.formBoxInputButtonBox}>
                            <input
                                disabled={!isValid}
                                type="submit"
                                value="Login"
                            />
                        </div>
                        <div className={styles.formBoxSocial}>
                            <span className={styles.formBoxSocialInfo}>
                                or continue with
                            </span>
                            <div className={styles.formBoxSocialItems}>
                                <Social />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default LoginForm;
