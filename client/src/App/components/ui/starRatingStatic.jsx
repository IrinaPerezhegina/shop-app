import React from "react";
// import style from "../../scss/components/starRating.module.scss";
import { BsStar, BsFillStarFill, BsStarHalf } from "react-icons/bs";
import PropTypes from "prop-types";
import { nanoid } from "@reduxjs/toolkit";

const StarRatingStatic = ({ rating }) => {
    const ratingNew = isNaN(rating) ? 0 : rating;

    let fill = ratingNew;
    let half;
    let empty;
    if (fill % 1 === 0) {
        empty = 5 - Math.floor(fill);
        half = 0;
    } else {
        half = 1;
        empty = 5 - Math.floor(fill) - 1;
        fill = 5 - 1 - empty;
    }

    return (
        <div>
            {[...Array(Math.floor(fill))].map((i) => (
                <BsFillStarFill key={nanoid()} size={25} fill={"yellow"} />
            ))}
            {half !== 0
                ? [...Array(half)].map((i) => (
                      <BsStarHalf key={nanoid()} size={25} fill={"yellow"} />
                  ))
                : ""}
            {[...Array(empty)].map((i) => (
                <BsStar key={nanoid()} size={25} fill={"yellow"} />
            ))}
        </div>
    );
};

StarRatingStatic.propTypes = {
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default StarRatingStatic;
