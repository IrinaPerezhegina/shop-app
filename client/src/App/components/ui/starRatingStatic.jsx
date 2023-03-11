import React from "react";
// import style from "../../scss/components/starRating.module.scss";
import { BsStar, BsFillStarFill, BsStarHalf } from "react-icons/bs";
import PropTypes from "prop-types";

const StarRatingStatic = ({ rating }) => {
    console.log(rating);
    const ratingNew = isNaN(rating) ? 0 : rating;
    console.log(ratingNew);
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
    console.log(fill, half, empty);
    return (
        <div>
            {[...Array(Math.floor(fill))].map((i) => (
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
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default StarRatingStatic;
