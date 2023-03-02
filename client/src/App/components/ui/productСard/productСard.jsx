import React from "react";
import PropTypes from "prop-types";
import styles from "./productCard.module.scss";
// import { MdStarRate } from "react-icons/md";
import { useDispatch } from "react-redux";
// import { addToCart } from "../../../store/cart";
import { BsCheckLg } from "react-icons/bs";
import { addToCart } from "../../../store/user.js";
import { Link } from "react-router-dom";
import StarRatingStatic from "../starRatingStatic";

const ProductCard = ({ id, title, price, image, rating }) => {
    const dispatch = useDispatch();
    // const products = useSelector(getCartItemsList);

    return (
        <article>
            <div className={styles.product}>
                <div className={styles.product__img}>
                    <Link to={`/${id}`}>
                        <img src={image} alt={title} />
                    </Link>
                </div>
                <div className={styles.product__description}>
                    <div className={styles.product__descriptionTitle}>
                        <a href="#"> {title}</a>
                    </div>
                    <div className={styles.product__descriptionEstimation}>
                        <StarRatingStatic rating={rating} />
                        {/* <div className={styles.starOne}>
                            <button>
                                <MdStarRate size="25px" fill="yellow" />
                            </button>
                        </div>
                        <div className={styles.starTwo}>
                            <button>
                                <MdStarRate size="25px" fill="yellow" />
                            </button>
                        </div>
                        <div className={styles.starThree}>
                            <button>
                                <MdStarRate size="25px" fill="yellow" />
                            </button>
                        </div>
                        <div className={styles.starFour}>
                            <button>
                                <MdStarRate size="25px" fill="yellow" />
                            </button>
                        </div>
                        <div className={styles.starFive}>
                            <button>
                                <MdStarRate size="25px" fill="yellow" />
                            </button>
                        </div> */}
                    </div>
                    <div className={styles.product__descriptionPrice}>
                        $ {price}
                    </div>
                    {!id ? (
                        <div className={styles.product__descriptionBtnDisabled}>
                            <button disabled>
                                <BsCheckLg />
                            </button>
                        </div>
                    ) : (
                        <div className={styles.product__descriptionBtn}>
                            <button
                                onClick={() =>
                                    dispatch(
                                        addToCart({
                                            _id: id,
                                            count: 1
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
