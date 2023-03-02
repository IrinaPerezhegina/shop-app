import React, { useEffect, useState } from "react";
import Footer from "../components/ui/Footer/footer";
import Header from "../components/ui/Header/header";
import Slider from "../components/ui/slider";
import styles from "../scss/components/productPage.module.scss";
import { MdOutlineDoneOutline } from "react-icons/md";
import { ImArrowLeft2 } from "react-icons/im";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getColors, loadColorsList } from "../store/colors";
import Spinner from "react-bootstrap/esm/Spinner";
import {
    getProductById,
    getProductsList,
    getProductsLoadingStatus,
    loadProductsList
} from "../store/products";
// import StarRating from "../components/ui/starRating";
import StarRatingStatic from "../components/ui/starRatingStatic";

const ProductPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const dispatch = useDispatch();
    const isLoading = useSelector(getProductsLoadingStatus());
    console.log(isLoading);

    const product = useSelector(getProductById(id));
    const products = useSelector(getProductsList());

    const colors = useSelector(getColors());
    const [data, setData] = useState({
        color: "",
        images: [],
        size: ""
    });
    console.log(data);
    useEffect(() => {
        dispatch(loadColorsList());
        dispatch(loadProductsList());
    }, [dispatch]);

    useEffect(() => {
        if (colors && products) {
            setData({
                color: product.color[0],
                images: product.images[0][product.color[0]],
                size: product.size[0]
            });
        }
    }, [product, colors]);
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

    if (products && colors) {
        const colorOfObject = colors.filter((col) =>
            product?.color.some((i) => i === col.name)
        );

        return (
            <>
                <Header />
                <section className={styles.product}>
                    <div className={styles.btnBack}>
                        <Link to={"/"} className={styles.link}>
                            <ImArrowLeft2
                                className={styles.linkIcon}
                                size={"20px"}
                                fill={"white"}
                            />
                            Back
                        </Link>
                    </div>
                    <div className={styles.productWrapper}>
                        <div className={styles.card}>
                            <div className={styles.productImgs}>
                                <div className={styles.img_display}>
                                    <Slider img={data.images} />
                                </div>
                            </div>
                            {location.pathname === `/${id}/comments` ? (
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
                                        <Link to={`/${id}/comments`}>
                                            <StarRatingStatic
                                                rating={product.rating}
                                            />
                                        </Link>
                                        <span>
                                            {product.rating} (
                                            {product.reviews.length})
                                        </span>
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
                                        <button type="button">
                                            Add to Cart
                                        </button>
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
        <Spinner />;
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
