import React from "react";
// import style from "../../scss/components/starRating.module.scss";
import { BsStar, BsFillStarFill, BsStarHalf } from "react-icons/bs";
import PropTypes from "prop-types";

const StarRatingStatic = ({ rating }) => {
    let fill = rating;
    let half;
    let empty;
    if (fill % 1 === 0) {
        empty = 5 - fill;
        half = 0;
    } else {
        half = 1;
        empty = 5 - Math.floor(fill) - 1;
        fill = 5 - 1 - empty;
    }
    console.log(half, empty, fill);
    return (
        <div>
            {[...Array(fill)].map((i) => (
                <BsFillStarFill key={i} size={25} fill={"yellow"} />
            ))}
            {half !== 0
                ? [...Array(half)].map((i) => (
                      <BsStarHalf key={i} size={25} fill={"yellow"} />
                  ))
                : ""}
            {[...Array(empty)].map((i) => (
                <BsStar key={i} size={25} fill={"yellow"} />
            ))}
            {/* <BsStar size={25} /> */}
            {/* <BsFillStarFill size={25} /> */}
        </div>
    );
};

StarRatingStatic.propTypes = {
    rating: PropTypes.number
};

export default StarRatingStatic;
