import React from "react";
import styles from "../../scss/libs/adminPage.module.scss";
import PropTypes from "prop-types";
import { AiFillDelete } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { nanoid } from "nanoid";

const AdminCartProduct = ({
    onHide,
    onRemove,
    onClick,
    price,
    _id,
    title,
    image,
    article,
    category,
    rating,
    size
}) => {
    return (
        <section key={nanoid()} className={styles.product}>
            <div className={styles.product_art}>
                <h6>{article}</h6>
            </div>
            <div className={styles.product_img}>
                <img src={image} alt={title} />
            </div>

            <div className={styles.product_title}>
                <p>{title}</p>
            </div>
            <div className={styles.product_category}>
                <p>{category}</p>
            </div>
            <div className={styles.product_price}>
                <p>{price} $</p>
            </div>

            <div className={styles.product_rating}>
                <p>{rating} </p>
            </div>
            <div className={styles.product_size} key={nanoid()}>
                {size.map((elem, index) =>
                    index === 0 ? (
                        <i>{elem}</i>
                    ) : (
                        <i>
                            {", "}
                            {elem}
                        </i>
                    )
                )}
            </div>
            <div
                className={styles.product_controls}
                key={nanoid()}
                onClick={() => onClick(_id)}
            >
                <button type="button" onClick={onHide}>
                    <BsFillPencilFill fill="green" size="25px" />
                </button>
                <button type="button" onClick={() => onRemove(_id)}>
                    <AiFillDelete fill="green" size="30px" />
                </button>
            </div>
        </section>
    );
};
AdminCartProduct.propTypes = {
    onHide: PropTypes.func,
    onRemove: PropTypes.func,
    onClick: PropTypes.func,
    _id: PropTypes.string,
    title: PropTypes.string,
    image: PropTypes.string,
    article: PropTypes.string,
    category: PropTypes.string,
    rating: PropTypes.number,
    size: PropTypes.array,
    price: PropTypes.number
};
export default AdminCartProduct;
