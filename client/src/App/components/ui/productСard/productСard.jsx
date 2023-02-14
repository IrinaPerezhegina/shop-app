import React from "react";
import PropTypes from "prop-types";
import styles from "./productCard.module.scss";
import { MdStarRate } from "react-icons/md";

const ProductCard = ({ title, price, image }) => {
    return (
        <article>
            <div className={styles.product}>
                <div className={styles.product__img}>
                    <a href="#">
                        <img src={image} alt="Sneakers" />
                    </a>
                </div>
                <div className={styles.product__description}>
                    <div className={styles.product__descriptionTitle}>
                        <a href="#"> {title}</a>
                    </div>
                    <div className={styles.product__descriptionEstimation}>
                        <div className={styles.starOne}>
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
                        </div>
                    </div>
                    <div className={styles.product__descriptionPrice}>
                        $ {price}
                    </div>
                    <div className={styles.product__descriptionBtn}>
                        <a href="#">Shpo now</a>
                    </div>
                </div>
            </div>
        </article>
    );
};
ProductCard.propTypes = {
    link: PropTypes.string,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
};
export default ProductCard;
