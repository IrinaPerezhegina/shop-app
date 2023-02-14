import React from "react";
import { BiCart } from "react-icons/bi";
import { Link } from "react-router-dom";
import styles from "../Header/header.module.scss";
import Logo from "../logo";

const Header = () => {
    return (
        <div className={styles.headerWrapper}>
            <div className={styles.header}>
                <div>
                    <Logo />
                </div>
                <div className={styles.headerNavBar}>
                    <a className={styles.Active} href="/">
                        Main
                    </a>
                    <a href="/">Product</a>
                    <a href="/">About</a>
                    <a href="/">Review</a>
                </div>
                <div className={styles.ButtonWrapper}>
                    <a href="/" className={styles.cartWrapper}>
                        <p className={styles.cartPrice}>520 $</p>
                        <div className={styles.cartBorder}></div>
                        <div className={styles.cartBasket}>
                            <BiCart size="25px" fill="white" />
                            <span>3</span>
                        </div>
                    </a>
                    <Link to="/login" className={styles.cartWrapper}>
                        <p className={styles.cartPrice}>Sign In</p>
                    </Link>
                    <Link to="/register" className={styles.cartWrapper}>
                        <p className={styles.cartPrice}>Sign Up</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
