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
            {/* <div>
                <img src="/assets/productCard/id_1/1.jpg" />
            </div>
            <div>
                <img src="/assets/productCard/id_2/1.jpg" />
            </div>
            <div>
                <img src="/assets/productCard/id_3/1.jpg" />
            </div>
            <div>
                <img src="/assets/productCard/id_3/1.jpg" />
            </div> */}
        </Carousel>
    );
};

Slider.propTypes = {
    img: PropTypes.array
};

export default Slider;
