import React from "react";
import spinnerStyle from "../../scss/components/spinner.module.scss";
import Spinner from "react-bootstrap/Spinner";

const SpinnerComponent = () => {
    return (
        <div className={spinnerStyle.spinner__wrapper}>
            <div className={spinnerStyle.spinner__content}>
                <Spinner />
            </div>
        </div>
    );
};

export default SpinnerComponent;
