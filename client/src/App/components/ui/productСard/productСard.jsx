import React from "react";
import PropTypes from "prop-types";
import styles from "./productCard.module.scss";
import { BsCheckLg } from "react-icons/bs";
import { Link } from "react-router-dom";
import StarRatingStatic from "../starRatingStatic";
import ModalAddToCart from "../modalWindows/modalAddToCart";
import { useSelector } from "react-redux";
import { getCurrentBasket } from "../../../store/user";
const ProductCard = ({ id, title, price, image, rating }) => {
    const [modalShow, setModalShow] = React.useState(false);
    const cartItems = useSelector(getCurrentBasket() ? getCurrentBasket() : []);
    function isBasket(id) {
        return cartItems.some((item) => item._id === id);
    }

    return (
        <article>
            <div className={styles.product}>
                <ModalAddToCart
                    id={id}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />

                <div className={styles.product__img}>
                    <Link to={`/${id}`}>
                        <img src={image} alt={title} />
                    </Link>
                </div>
                <div className={styles.product__description}>
                    <div className={styles.product__descriptionTitle}>
                        <Link to={`/${id}`}> {title}</Link>
                    </div>
                    <div className={styles.product__descriptionEstimation}>
                        <StarRatingStatic rating={rating} />
                    </div>
                    <div className={styles.product__descriptionPrice}>
                        $ {price}
                    </div>
                    {isBasket(id) ? (
                        <div className={styles.product__descriptionBtnDisabled}>
                            <button disabled>
                                <BsCheckLg />
                            </button>
                        </div>
                    ) : (
                        <div className={styles.product__descriptionBtn}>
                            <button onClick={() => setModalShow(true)}>
                                Shpo now
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
};
ProductCard.propTypes = {
    rating: PropTypes.number,
    link: PropTypes.string,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.string
};
export default ProductCard;
