import React, { useEffect } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
import { BiCart } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProductsList } from "../../../store/products";

import {
    getCurrentBasket,
    getCurrentUserData,
    getCurrentUserId,
    getIsAdminIn,
    loadUserCurrent
} from "../../../store/user";
import styles from "../Header/header.module.scss";
import Logo from "../logo";
import NavProfile from "../navProfile";

const Header = () => {
    const dispatch = useDispatch();
    const currentUserAuthUserId = useSelector(getCurrentUserId());
    const currentUserData = useSelector(getCurrentUserData());
    const productsCart = useSelector(getCurrentBasket());
    const products = useSelector(getProductsList());
    const isAdmin = useSelector(getIsAdminIn());
    console.log(isAdmin);
    function getPricesOfBasket() {
        const sum = productsCart.reduce(
            (acc, product) =>
                acc +
                products.find((prod) => prod._id === product._id).price *
                    product.count,
            0
        );

        return sum.toFixed(3);
    }
    function getCountsByBasket() {
        const sum = productsCart.reduce(
            (acc, product) => acc + product.count,
            0
        );

        return sum;
    }
    useEffect(() => {
        if (currentUserAuthUserId) {
            dispatch(loadUserCurrent());
        }
    }, [dispatch]);

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.header}>
                <div>
                    <Logo />
                </div>
                <div className={styles.headerNavBar}>
                    <Link className={styles.Active} to="/">
                        Main
                    </Link>
                    <a href="/">Product</a>
                    <a href="/">About</a>
                    <a href="/">Review</a>
                </div>
                <div className={styles.ButtonWrapper}>
                    {isAdmin && (
                        <Link to="/admin" className={styles.cartWrapper}>
                            <p className={styles.cartPrice}>Change</p>
                        </Link>
                    )}
                    {products ? (
                        <Link to="/cart" className={styles.cartWrapper}>
                            <p className={styles.cartPrice}>
                                {getPricesOfBasket()} $
                            </p>
                            <div className={styles.cartBorder}></div>
                            <div className={styles.cartBasket}>
                                <BiCart size="25px" fill="white" />
                                <span>{getCountsByBasket()}</span>
                            </div>
                        </Link>
                    ) : (
                        <div className={styles.spinnerWrapper}>
                            <Spinner />
                        </div>
                    )}

                    {!currentUserAuthUserId ? (
                        <>
                            <Link to="/login" className={styles.cartWrapper}>
                                <p className={styles.cartPrice}>Sign In</p>
                            </Link>
                            <Link to="/register" className={styles.cartWrapper}>
                                <p className={styles.cartPrice}>Sign Up</p>
                            </Link>
                        </>
                    ) : currentUserData ? (
                        <NavProfile username={currentUserData.username} />
                    ) : (
                        <div className={styles.spinnerWrapper}>
                            <Spinner />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
