import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import PropTypes from "prop-types";
import TextAreaField from "../../common/form/textAreaField";
import TextField from "../../common/form/textField";
import MultiSelectField from "../../common/form/multiSelectField";
import SelectField from "../../common/form/selectField";
import { useDispatch, useSelector } from "react-redux";
import { getColors, loadColorsList } from "../../../store/colors";
import styles from "../../../scss/components/modalWindowChangeProduct.module.scss";
import { nanoid } from "@reduxjs/toolkit";
import * as yup from "yup";
import { isValidUrl } from "../../../utils/isValidUrl";
import { getProductById, updateAllProduct } from "../../../store/products";

const sortCategory = [
    {
        value: "female",
        label: "Female"
    },
    {
        value: "men's",
        label: "Men's"
    }
];
const sizes = [
    {
        label: "35",
        value: "35"
    },
    {
        label: "36",
        value: "36"
    },
    {
        label: "37",
        value: "37"
    },
    {
        label: "38",
        value: "38"
    },
    {
        label: "39",
        value: "39"
    },
    {
        label: "40",
        value: "40"
    },
    {
        label: "41",
        value: "41"
    },
    {
        label: "42",
        value: "42"
    },
    {
        label: "43",
        value: "43"
    },
    {
        label: "44",
        value: "44"
    },
    {
        label: "45",
        value: "45"
    },
    {
        label: "46",
        value: "46"
    },
    {
        label: "47",
        value: "47"
    }
];

const validateSchema = yup.object().shape({
    sizes: yup
        .array()
        .min(1)
        .required(`Поле 'Sizes' обязательно для заполнения`),
    amortization: yup
        .string()
        .required(`Поле 'Amortization' обязательно для заполнения`),
    article: yup.string().required(`Поле 'Article' обязательно для заполнения`),
    rating: yup.number().required(`Поле 'Rating' обязательно для заполнения`),
    image: yup.string().required(`Поле 'Image' обязательно для заполнения`),
    // .url("Поле 'Image' должно быть ссылкой"),
    category: yup
        .string()
        .required(`Поле 'Category' обязательно для заполнения`),
    description: yup
        .string()
        .required(`Поле 'Description' обязательно для заполнения`),
    price: yup.number().required(`Поле 'Price' обязательно для заполнения`),
    title: yup.string().required(`Поле 'Title' обязательно для заполнения`)
});

function ModalWindowChangeProduct(props) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const id = props._id;
    const product = useSelector(getProductById(id));
    const [imageUrl, getImageUtl] = useState({});
    const [images, getImages] = useState({});
    const colors = useSelector(getColors());
    const [errorImages, getErrorImages] = useState({});

    product && console.log(product.sizes);
    console.log(images);
    const [data, setData] = useState(product);
    useEffect(() => {
        dispatch(loadColorsList());
        product &&
            setData((prevState) => ({
                ...prevState,
                sizes: defaultSizes(sizes, product?.size)
            }));
        product && getImageUtl(dataColor(product.color, product.images));
        product && getImages(urlColor(product.images));
    }, [dispatch]);

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleChangeColor = ({ target }) => {
        setData((prevState) => {
            if (
                prevState[target.name] &&
                !prevState[target.name].find((prev) => prev === target.value)
            ) {
                return {
                    ...prevState,
                    [target.name]: [...prevState[target.name], target.value]
                };
            } else if (
                prevState[target.name] &&
                prevState[target.name].find((prev) => prev === target.value)
            ) {
                return {
                    ...prevState,
                    [target.name]: [
                        ...prevState[target.name].filter(
                            (prev) => prev !== target.value
                        )
                    ]
                };
            } else return { ...prevState, [target.name]: [target.value] };
        });
        getImageUtl((prevState) => {
            return { ...prevState, [target.value]: 1 };
        });
    };
    function addImageUrl(col) {
        getImageUtl((prevState) => ({
            ...prevState,
            [col]: prevState[col] + 1
        }));
    }
    function deleteImageUrl(col) {
        console.log(col);
        getImageUtl((prevState) => ({
            ...prevState,
            [col]: prevState[col] - 1
        }));
    }

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        validateSchema
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));

        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    console.log(isValid);
    const handleSubmit = (e) => {
        e.preventDefault();

        const isValid = validate();
        console.log(isValid);
        console.log(isValidUrl());

        if (!isValid) return;

        function displayOptions(displayDevice, col) {
            const newObj = [];
            for (const key in displayDevice) {
                console.log(displayDevice[key] !== "");
                if (key.split("-")[0] === col && displayDevice[key] !== "") {
                    newObj.push(displayDevice[key]);
                } else {
                    getErrorImages(displayDevice[key]);
                }
            }

            return newObj;
        }

        const newImages = data.color.map((col) => ({
            [col]: displayOptions(images, col)
        }));
        console.log(newImages);
        console.log(errorImages);
        const newData = {
            ...data,
            images: newImages,
            sizes: data.sizes.map((q) => q.value)
        };
        dispatch(updateAllProduct(newData, id));
        console.log(newData);
        console.log(errorImages);
    };

    const handleChangeUrl = (target) => {
        getImages((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    function defaultSizes(sizes, data) {
        const defaultSizes = [];
        sizes.map((size) =>
            data.some((i) => i === size.value) ? defaultSizes.push(size) : ""
        );
        return defaultSizes;
    }
    function dataColor(data, lengthArray) {
        const newColor = {};
        data.map((col, i) => (newColor[col] = lengthArray[i][col]?.length));
        return newColor;
    }
    function urlColor(data) {
        const newColor = {};
        // console.log(data);
        // console.log(imageUrl);
        // data.forEach((col, i) =>
        //     col[col].forEach(
        //         (url, i) => (newColor[`${col}-${i + 1}`] = [col][i])
        //     )
        // );console.log(col[product.color[i]]));
        // data.map((col, i) => (newColor[col] = lengthArray[i][col]?.length));
        // data.forEach((col, i) => col[col].forEach((c, i) => console.log(c)));
        data.forEach((col, i) =>
            col[product.color[i]].forEach(
                (c, k) => (newColor[`${product.color[i]}-${k + 1}`] = c)
            )
        );
        console.log(newColor);
        return newColor;
    }
    product && urlColor(product.images, imageUrl);
    product && console.log(product.images);
    console.log(imageUrl);
    return (
        product && (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Change a product
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.formChange}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Title"
                            type="text"
                            name="title"
                            value={data.title || ""}
                            onChange={handleChange}
                            error={errors.title}
                        />
                        <TextField
                            label="Price"
                            type="number"
                            step="0.01"
                            min="0"
                            name="price"
                            value={data.price || ""}
                            onChange={handleChange}
                            error={errors.price}
                        />
                        <TextAreaField
                            label="Description                        "
                            name="description"
                            value={data.description || ""}
                            onChange={handleChange}
                            error={errors.description}
                        />
                        <SelectField
                            label="Select a category"
                            options={sortCategory}
                            name="category"
                            onChange={handleChange}
                            value={data.category || ""}
                            error={errors.category}
                        />
                        <TextField
                            label="Image (add URL)"
                            type="text"
                            name="image"
                            value={data.image || ""}
                            onChange={handleChange}
                            error={errors.image}
                        />
                        <TextField
                            label="Rating"
                            type="number"
                            min="0"
                            max="5"
                            step="0.1"
                            name="rating"
                            value={data.rating || ""}
                            onChange={handleChange}
                            error={errors.rating}
                        />
                        <TextField
                            label="Article"
                            type="text"
                            name="article"
                            value={data.article || ""}
                            onChange={handleChange}
                            error={errors.article}
                        />
                        <TextAreaField
                            label="Amortization                        "
                            name="amortization"
                            value={data.amortization || ""}
                            onChange={handleChange}
                            error={errors.amortization}
                        />
                        <MultiSelectField
                            options={sizes}
                            onChange={handleChange}
                            defaultValue={defaultSizes(sizes, data.size)}
                            name="sizes"
                            label="Choose sizes"
                            error={errors.sizes}
                        />

                        <p className={styles.colorTitle}>Change Colors:</p>
                        <div className={styles.colorWrapper}>
                            {colors &&
                                colors.map((col) => (
                                    <div key={nanoid()}>
                                        <input
                                            onChange={handleChangeColor}
                                            id={col.name}
                                            type="checkbox"
                                            name="color"
                                            data-image={col.name}
                                            value={col.name}
                                        />
                                        <label
                                            className={
                                                data?.color?.find(
                                                    (colArray) =>
                                                        colArray === col.name
                                                )
                                                    ? styles.colorWrapperChecked
                                                    : styles.colorWrapper
                                            }
                                            htmlFor={col.name}
                                            style={{
                                                backgroundColor: col.value
                                            }}
                                        ></label>
                                    </div>
                                ))}
                        </div>
                        <div className={styles.urlColor} key={nanoid()}>
                            {data?.color?.map((col, i) => (
                                <>
                                    <div
                                        key={nanoid()}
                                        className={styles.urlColorWrapper}
                                    >
                                        <div className={styles.urlColorBtn}>
                                            {imageUrl[col] && (
                                                <button
                                                    onClick={() =>
                                                        addImageUrl(col)
                                                    }
                                                >
                                                    {` add Url ${col}`}
                                                </button>
                                            )}
                                            {imageUrl[col] > 1 && (
                                                <button
                                                    onClick={() =>
                                                        deleteImageUrl(col)
                                                    }
                                                >
                                                    {` delete Url ${col}`}
                                                </button>
                                            )}
                                        </div>

                                        {imageUrl[col] &&
                                            [...Array(imageUrl[col])].map(
                                                (num, i) => (
                                                    <div key={nanoid()}>
                                                        <TextField
                                                            label={`${col}-${
                                                                i + 1
                                                            }`}
                                                            type="text"
                                                            name={`${col}-${
                                                                i + 1
                                                            }`}
                                                            value={
                                                                images[
                                                                    `${col}-${
                                                                        i + 1
                                                                    }`
                                                                ] || ""
                                                            }
                                                            onChange={
                                                                handleChangeUrl
                                                            }
                                                            error={
                                                                errorImages[
                                                                    `${col}-${
                                                                        i + 1
                                                                    }`
                                                                ]
                                                            }
                                                        />
                                                    </div>
                                                )
                                            )}
                                    </div>
                                </>
                            ))}
                        </div>
                        <button
                            disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                            type="submit"
                            // disabled={!isValid}
                        >
                            Submit
                        </button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    {/* <button
                    type="submit"
                    // disabled={!isValid}
                    onClick={handleSubmit}
                >
                    send
                </button> */}
                </Modal.Footer>
            </Modal>
        )
    );
}
ModalWindowChangeProduct.propTypes = {
    _id: PropTypes.string,
    onSubmit: PropTypes.string,
    onHide: PropTypes.func
};
export default ModalWindowChangeProduct;
