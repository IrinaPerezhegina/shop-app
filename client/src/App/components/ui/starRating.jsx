import React, { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import style from "../../scss/components/starRating.module.scss";
import PropTypes from "prop-types";
import { nanoid } from "@reduxjs/toolkit";

const StarRating = ({ onChange, value, error }) => {
    const [rating, setRating] = useState(null);
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label key={nanoid()}>
                        <input
                            className={style.starInput}
                            onChange={handleChange}
                            type="radio"
                            name="estimation"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                        />
                        <BsFillStarFill
                            size={30}
                            className={style.star}
                            fill={
                                ratingValue <= rating && value
                                    ? "#ffc107"
                                    : "#e4e5e9"
                            }
                        />
                    </label>
                );
            })}
            {error && <div className={style.starError}>{error}</div>}
        </div>
    );
};
StarRating.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
    error: PropTypes.string
};
export default StarRating;
