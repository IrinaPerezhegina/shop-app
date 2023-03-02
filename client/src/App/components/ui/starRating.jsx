import React, { useState } from "react";
import { BsFillStarFill } from "react-icons/bs";
import style from "../../scss/components/starRating.module.scss";
const StarRating = () => {
    const [rating, setRating] = useState(null);
    return (
        <div>
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                    <label key={star}>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                        />
                        <BsFillStarFill
                            className={style.star}
                            fill={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;
