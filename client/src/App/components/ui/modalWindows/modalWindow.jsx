import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import StarRating from "../starRating";
import styles from "../../../scss/components/modalWindow.module.scss";
import TextAreaField from "../../common/form/textAreaField";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
    createComment,
    getComments,
    loadCommentsList
} from "../../../store/comments";
import { useParams } from "react-router-dom";
import localStorageService from "../../../service/localStorage.service";
import { updateProduct } from "../../../store/products";

function ModalWindow(props) {
    const { productId } = useParams();

    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const [data, setData] = useState({
        estimation: "",
        content: ""
    });
    const comments = useSelector(getComments(productId));
    function calculatingRatings(data, newRating) {
        const result = data.reduce((acc, i) => acc + i.estimation, 0);

        return (result + Number(newRating)) / (data.length + 1);
    }

    useEffect(() => {
        dispatch(loadCommentsList(productId));
    }, [dispatch]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        content: {
            isRequired: {
                message: "Сообщение не может быть пустым"
            }
        },
        estimation: {
            isRequired: {
                message: "Оцените"
            }
        }
    };

    const clearForm = () => {
        setData({});
        setErrors({});
    };

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        dispatch(
            createComment({
                ...data,
                productId,
                userId: localStorageService.getUserId()
            })
        );

        const updateData = {
            rating: calculatingRatings(
                comments,
                Number(data.estimation)
            ).toFixed(1),

            numReviews: comments.length + 1
        };

        dispatch(updateProduct(updateData, productId));
        clearForm();
        props.onHide();
        setData({});
        setErrors({});
    };
    useEffect(() => {
        validate();
    }, [data, dispatch]);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Leave a review
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit}>
                    <div className={styles.modalRating}>
                        <h4>Your estimation</h4>
                        <StarRating
                            error={errors.estimation}
                            value={Number(data.estimation) || 0}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.modalReview}>
                        <h4></h4>
                        <TextAreaField
                            value={data.content || ""}
                            name={"content"}
                            label={"Your Review"}
                            onChange={handleChange}
                            error={errors.content}
                        />
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button
                    className={styles.modalBtn}
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
ModalWindow.propTypes = {
    onSubmit: PropTypes.string,
    onHide: PropTypes.func
};
export default ModalWindow;
