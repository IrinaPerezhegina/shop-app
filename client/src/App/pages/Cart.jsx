import React, { useEffect } from "react";
import Header from "../components/ui/Header/header";
import Footer from "../components/ui/Footer/footer";
import styles from "../scss/components/cart.module.scss";
import { AiFillDelete } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
    addToCart,
    deleteByOnePosition,
    getCurrentBasket,
    getUserLoadingStatus,
    loadUserCurrent,
    reduceByOnePosition
} from "../store/user";
import { getProductsList, loadProductsList } from "../store/products";
import SpinnerComponent from "../components/ui/spinner";
import { Link } from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(getUserLoadingStatus());
    const productsCart = useSelector(getCurrentBasket());
    const products = useSelector(getProductsList());
    console.log(products);
    useEffect(() => {
        dispatch(loadUserCurrent());
        dispatch(loadProductsList());
    }, [dispatch]);
    function getCountsByBasket() {
        const sum = productsCart.reduce(
            (acc, product) => acc + product.count,
            0
        );

        return sum;
    }
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
    return (
        <>
            <Header />
            {products && !isLoading ? (
                <section className={styles.sectionCart}>
                    <header className={styles.sectionCart_header}>
                        <div className={styles.container}>
                            <h2 className={styles.title_1}>
                                Your Basket{" "}
                                <BsFillCartFill fill="green" size="40px" />
                            </h2>
                        </div>
                    </header>
                    <div className={styles.sectionCart_body}>
                        <div className={styles.container}>
                            <section className={styles.cart}>
                                <header className={styles.cart_header}>
                                    <div className={styles.cart_headerTitle}>
                                        product name
                                    </div>
                                    <div className={styles.cart_headerCount}>
                                        quantity
                                    </div>
                                    <div className={styles.cart_headerCost}>
                                        price
                                    </div>
                                </header>
                                {productsCart.map(({ _id, count }) => (
                                    <>
                                        <section
                                            key={_id}
                                            className={styles.product}
                                        >
                                            <div className={styles.product_img}>
                                                <img
                                                    src={
                                                        products?.find(
                                                            (prod) =>
                                                                prod._id === _id
                                                        ).image
                                                    }
                                                    alt={
                                                        products.find(
                                                            (prod) =>
                                                                prod._id === _id
                                                        ).title
                                                    }
                                                />
                                            </div>

                                            <div
                                                className={styles.product_title}
                                            >
                                                <Link>
                                                    {
                                                        products.find(
                                                            (prod) =>
                                                                prod._id === _id
                                                        ).title
                                                    }
                                                </Link>
                                            </div>

                                            <div
                                                className={styles.product_count}
                                            >
                                                <div className={styles.count}>
                                                    <div
                                                        className={
                                                            styles.count_box
                                                        }
                                                    >
                                                        <p>{count}</p>
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.count_controls
                                                        }
                                                    >
                                                        <button
                                                            type="button"
                                                            className={
                                                                styles.count_up
                                                            }
                                                            onClick={() =>
                                                                dispatch(
                                                                    addToCart({
                                                                        _id,
                                                                        count: 1
                                                                    })
                                                                )
                                                            }
                                                        >
                                                            <BiUpArrow fill="green" />
                                                        </button>

                                                        <button
                                                            disabled={
                                                                count <= 1
                                                            }
                                                            onClick={() =>
                                                                dispatch(
                                                                    reduceByOnePosition(
                                                                        {
                                                                            _id,
                                                                            count: -1
                                                                        }
                                                                    )
                                                                )
                                                            }
                                                            type="button"
                                                            className={
                                                                styles.count_down
                                                            }
                                                        >
                                                            <BiDownArrow fill="green" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div
                                                className={styles.product_price}
                                            >
                                                {(
                                                    products.find(
                                                        (prod) =>
                                                            prod._id === _id
                                                    ).price * count
                                                ).toFixed(3)}{" "}
                                                $
                                            </div>

                                            <div
                                                className={
                                                    styles.product_controls
                                                }
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        dispatch(
                                                            deleteByOnePosition(
                                                                {
                                                                    _id,
                                                                    count: 0
                                                                }
                                                            )
                                                        )
                                                    }
                                                >
                                                    <AiFillDelete
                                                        fill="green"
                                                        size="30px"
                                                    />
                                                </button>
                                            </div>
                                        </section>
                                    </>
                                ))}
                                <div className={styles.cart_footer}>
                                    <div className={styles.cart_footerCount}>
                                        {getCountsByBasket() + " ????????????"}
                                    </div>
                                    <div className={styles.cart_footerPrice}>
                                        {getPricesOfBasket() + " $"}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            ) : (
                <SpinnerComponent />
            )}

            <Footer />
        </>
    );
};

export default Cart;
