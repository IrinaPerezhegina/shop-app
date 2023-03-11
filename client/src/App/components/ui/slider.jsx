import React from "react";
import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Slider = ({ img }) => {
    return (
        <Carousel>
            {img.map((i) => (
                <div key={img}>
                    <img src={i} />
                </div>
            ))}
        </Carousel>
    );
};

Slider.propTypes = {
    img: PropTypes.array
};

export default Slider;
