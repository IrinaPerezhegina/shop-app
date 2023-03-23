import React, { useEffect, useState } from "react";
import Footer from "../components/ui/Footer/footer";
import Header from "../components/ui/Header/header";
import Slider from "../components/ui/slider";
import styles from "../scss/components/productPage.module.scss";
import { MdOutlineDoneOutline } from "react-icons/md";
import { ImArrowLeft2 } from "react-icons/im";
import { BsCheckLg } from "react-icons/bs";
import {
    Link,
    Outlet,
    useLocation,
    useNavigate,
    useParams
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getColors, loadColorsList } from "../store/colors";
import {
    getProductById,
    getProductsList,
    loadProductsList
} from "../store/products";
import StarRatingStatic from "../components/ui/starRatingStatic";
import {
    getComments,
    getCommentsLoadingStatus,
    loadCommentsList
} from "../store/comments";
import SpinnerComponent from "../components/ui/spinner";
import {
    addToCart,
    getCurrentBasket,
    getIsLoggedIn,
    loadUserCurrent
} from "../store/user";

const ProductPage = () => {
    const { productId } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const isLoading = useSelector(getCommentsLoadingStatus());
    const comments = useSelector(getComments(productId));
    const product = useSelector(getProductById(productId));
    const products = useSelector(getProductsList());
    const navigate = useNavigate();
    const isLoggedIn = useSelector(getIsLoggedIn());
    const colors = useSelector(getColors());
    const [data, setData] = useState({
        color: "",
        images: [],
        size: ""
    });
    console.log(isLoggedIn);
    const cartItems = useSelector(getCurrentBasket() ? getCurrentBasket() : []);

    function isBasket(id, data) {
        const elem = cartItems.find((elem) => elem._id === id);
        if (data && elem?.color === data?.color && elem?.size === data.size) {
            return true;
        } else return false;
    }

    function calculatingRatings(data) {
        if (!isLoading) {
            return data.reduce((acc, i) => acc + i.estimation, 0) / data.length;
        } else {
            return 0;
        }
    }

    useEffect(() => {
        dispatch(loadUserCurrent());
    }, [dispatch]);

    useEffect(() => {
        dispatch(loadCommentsList(productId));
        dispatch(loadColorsList());
        dispatch(loadProductsList());
    }, [dispatch]);

    useEffect(() => {
        if (colors && products && product && cartItems) {
            if (cartItems.find((elem) => elem._id === productId)) {
                const elem = cartItems.find((elem) => elem._id === productId);

                setData({
                    color: elem.color,
                    images: product?.images.find((img) => img[elem.color])[
                        elem.color
                    ],
                    size: cartItems.find((elem) => elem._id === productId).size
                });
            } else {
                setData({
                    color: product.color[0],
                    images: product.images[0][product.color[0]],
                    size: product.size[0]
                });
            }
        }
    }, [product, colors, cartItems]);
    const handleChange = ({ target }) => {
        if (target.name === "color") {
            const image = product.images.find((i) => i[target.value]);
            setData((prevState) => ({
                ...prevState,
                color: target.value,
                images: image[target.value]
            }));
        } else {
            setData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));
        }
    };
    if (product && products && colors && cartItems && data) {
        const colorOfObject = colors?.filter((col) =>
            product?.color.some((i) => i === col.name)
        );

        return (
            <>
                <Header />
                <section className={styles.product}>
                    <div className={styles.btnBack}>
                        <button
                            onClick={() => navigate(-1)}
                            className={styles.link}
                        >
                            <ImArrowLeft2
                                className={styles.linkIcon}
                                size={"20px"}
                                fill={"white"}
                            />
                            Back
                        </button>
                    </div>
                    <div className={styles.productWrapper}>
                        <div className={styles.card}>
                            <div className={styles.productImgs}>
                                <div className={styles.img_display}>
                                    <Slider img={data.images} />
                                </div>
                            </div>
                            {location.pathname === `/${productId}/comments` ? (
                                <Outlet />
                            ) : (
                                <div className={styles.product_content}>
                                    <h2 className={styles.product_title}>
                                        {product.title}
                                    </h2>
                                    <div className={styles.product_art}>
                                        <span>art.:{product.article}</span>
                                    </div>
                                    <div className={styles.product_rating}>
                                        <Link
                                            to={`/${productId}/comments`}
                                            className={
                                                styles.product_ratingLink
                                            }
                                        >
                                            <StarRatingStatic
                                                rating={
                                                    comments &&
                                                    calculatingRatings(
                                                        comments
                                                    ).toFixed(1)
                                                }
                                            />

                                            <span>
                                                {comments &&
                                                isNaN(
                                                    calculatingRatings(comments)
                                                )
                                                    ? 0
                                                    : calculatingRatings(
                                                          comments
                                                      ).toFixed(1)}
                                                ({comments && comments.length})
                                            </span>
                                        </Link>
                                    </div>
                                    <div className={styles.product_price}>
                                        <p>{product.price} $</p>
                                    </div>
                                    <div className={styles.product_detail}>
                                        <h2>description:</h2>
                                        <p>{product.description}</p>
                                        <h2>amortization:</h2>
                                        <p>{product.amortization}</p>
                                        <ul>
                                            <li>
                                                <MdOutlineDoneOutline
                                                    size={"20px"}
                                                    fill={"green"}
                                                    style={{ marginRight: 10 }}
                                                />
                                                Color: <span>{data.color}</span>
                                            </li>

                                            <li>
                                                <MdOutlineDoneOutline
                                                    size={"20px"}
                                                    fill={"green"}
                                                    style={{ marginRight: 10 }}
                                                />
                                                Category:
                                                <span>{product.category}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className={styles.product_colorChoose}>
                                        <h2>Choose color:</h2>
                                        <div
                                            className={
                                                styles.product_colorWrapper
                                            }
                                        >
                                            {colorOfObject &&
                                                colorOfObject.map((col) => (
                                                    <div key={col._id}>
                                                        <input
                                                            onChange={
                                                                handleChange
                                                            }
                                                            id={col.name}
                                                            type="radio"
                                                            name="color"
                                                            data-image={
                                                                col.name
                                                            }
                                                            value={col.name}
                                                        />
                                                        <label
                                                            className={
                                                                col.name ===
                                                                data.color
                                                                    ? styles.product_colorWrapperChecked
                                                                    : styles.product_colorWrapper
                                                            }
                                                            htmlFor={col.name}
                                                            style={{
                                                                backgroundColor:
                                                                    col.value
                                                            }}
                                                        ></label>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                    <div className={styles.product_sizeChoose}>
                                        <h2>Choose size:</h2>
                                        <div
                                            className={
                                                styles.product_sizeWrapper
                                            }
                                        >
                                            {product &&
                                                product.size.map((i) => (
                                                    <div key={i}>
                                                        <input
                                                            onChange={
                                                                handleChange
                                                            }
                                                            id={i}
                                                            type="radio"
                                                            name="size"
                                                            data-image={i}
                                                            value={i}
                                                        />
                                                        <label
                                                            className={
                                                                i === data.size
                                                                    ? styles.product_sizeWrapperChecked
                                                                    : styles.product_sizeWrapper
                                                            }
                                                            htmlFor={i}
                                                        >
                                                            <span>{i}</span>
                                                        </label>
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                    <div className={styles.product_btn}>
                                        {!isLoggedIn ? (
                                            <div
                                                className={
                                                    styles.product__descriptionBtn
                                                }
                                            >
                                                <button
                                                    onClick={() =>
                                                        navigate("/login")
                                                    }
                                                >
                                                    Shpo now
                                                </button>
                                            </div>
                                        ) : cartItems &&
                                          isBasket(productId, data) ? (
                                            <div
                                                className={
                                                    styles.product__descriptionBtnDisabled
                                                }
                                            >
                                                <button disabled>
                                                    <BsCheckLg />
                                                </button>
                                            </div>
                                        ) : (
                                            <div
                                                className={
                                                    styles.product__descriptionBtn
                                                }
                                            >
                                                <button
                                                    onClick={() =>
                                                        dispatch(
                                                            addToCart({
                                                                _id: productId,
                                                                count: 1,
                                                                color: data.color,
                                                                size: data.size,
                                                                change: true
                                                            })
                                                        )
                                                    }
                                                >
                                                    Shpo now
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                <Footer />
            </>
        );
    } else {
        return <SpinnerComponent />;
    }
};

export default ProductPage;

// {
//     "id": 25606700299,
//     "title": "Кроссовки женские Nike Air Zoom Pegasus 37",
//     "price": 109.95,
//     "description": "Кроссовки Nike Air Zoom Pegasus 37 помогут открыть второе дыхание, даже если силы на исходе. Классическая удобная посадка в сочетании с мгновенной амортизацией — идеальный выбор для ежедневных пробежек",
//     "category": "female",
//     "image": "/assets/productCard/id_1/1.jpg",
//     "rating": { "rate": 3.9, "count": 120 },
//     "article": "4A8BCABDW2",
//     "amortization": "Пеноматериал Nike React и вставка Air Zoom в передней части стопы для мгновенной амортизации.",
//     "color": ["black", "white"]
//   },
