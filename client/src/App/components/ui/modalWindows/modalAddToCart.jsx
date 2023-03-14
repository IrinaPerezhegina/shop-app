import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import colorStyle from "../../../scss/components/productPage.module.scss";
import styles from "../../../scss/components/modalWindow.module.scss";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getColors, loadColorsList } from "../../../store/colors";
import { getProductById } from "../../../store/products";
import { addToCart } from "../../../store/user";

function ModalAddToCart(props) {
    const dispatch = useDispatch();
    const productId = props.id;
    const [errors, setErrors] = useState({});
    const colors = useSelector(getColors());
    const product = useSelector(getProductById(productId));
    const [data, setData] = useState({
        color: "",
        size: ""
    });

    useEffect(() => {
        dispatch(loadColorsList(productId));
    }, [dispatch]);

    const validatorConfig = {
        color: {
            isRequired: {
                message: "Сhoose a Сolor"
            }
        },
        size: {
            isRequired: {
                message: "Сhoose a Size"
            }
        }
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const clearForm = () => {
        setData({});
        setErrors({});
    };
    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(
            addToCart({
                _id: productId,
                count: 1,
                color: data.color,
                size: data.size
            })
        );
        props.onHide();
        clearForm();
    };
    useEffect(() => {
        validate();
    }, [data, dispatch]);
    const handleChange = ({ target }) => {
        if (target.name === "color") {
            setData((prevState) => ({
                ...prevState,
                color: target.value
            }));
        } else {
            setData((prevState) => ({
                ...prevState,
                [target.name]: target.value
            }));
        }
    };
    if (colors && product) {
        const colorOfObject = colors.filter((col) =>
            product?.color.some((i) => i === col.name)
        );

        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className={styles.backgroundColor}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Adding to Cart
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.backgroundColor}>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.modalRating}>
                            <h4>Change color</h4>
                            <div className={colorStyle.product_colorWrapper}>
                                {colorOfObject &&
                                    colorOfObject.map((col) => (
                                        <div key={col._id}>
                                            <input
                                                onChange={handleChange}
                                                id={col.name}
                                                type="radio"
                                                name="color"
                                                data-image={col.name}
                                                value={col.name}
                                            />
                                            <label
                                                className={
                                                    col.name === data.color
                                                        ? colorStyle.product_colorWrapperChecked
                                                        : colorStyle.product_colorWrapper
                                                }
                                                htmlFor={col.name}
                                                style={{
                                                    backgroundColor: col.value
                                                }}
                                            ></label>
                                        </div>
                                    ))}
                            </div>
                            {<div className={styles.error}>{errors.color}</div>}
                            <div className={colorStyle.product_sizeChoose}>
                                <h2>Choose size:</h2>
                                <div className={colorStyle.product_sizeWrapper}>
                                    {product &&
                                        product.size.map((i) => (
                                            <div key={i}>
                                                <input
                                                    onChange={handleChange}
                                                    id={i}
                                                    type="radio"
                                                    name="size"
                                                    data-image={i}
                                                    value={i}
                                                />
                                                <label
                                                    className={
                                                        i === data.size
                                                            ? colorStyle.product_sizeWrapperChecked
                                                            : colorStyle.product_sizeWrapper
                                                    }
                                                    htmlFor={i}
                                                >
                                                    <span>{i}</span>
                                                </label>
                                            </div>
                                        ))}
                                </div>
                                {
                                    <div className={styles.error}>
                                        {errors.size}
                                    </div>
                                }
                            </div>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className={
                            !isValid ? styles.modalBtn : styles.modalDisabled
                        }
                        type="submit"
                        disabled={!isValid}
                        onClick={handleSubmit}
                    >
                        send
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}
ModalAddToCart.propTypes = {
    id: PropTypes.string,
    onSubmit: PropTypes.string,
    onHide: PropTypes.func
};
export default ModalAddToCart;
