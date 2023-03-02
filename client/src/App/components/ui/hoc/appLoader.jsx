import { React, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import { getCurrentUserData, getUserLoadingStatus } from "../../../store/user";
import {
    getProductsLoadingStatus,
    getProductsList
} from "../../../store/products";
import SpinnerComponent from "../spinner";

const AppLoader = ({ children }) => {
    const dispatch = useDispatch();

    const usersStatusLoading = useSelector(getUserLoadingStatus());
    const productsStatusLoading = useSelector(getProductsLoadingStatus());
    console.log(usersStatusLoading, productsStatusLoading);
    useEffect(() => {
        if (!usersStatusLoading && !productsStatusLoading) {
            dispatch(getCurrentUserData());
            dispatch(getProductsList());
        }
    }, [dispatch]);

    if (usersStatusLoading && productsStatusLoading) {
        <SpinnerComponent />;
    }
    return children;
};
AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default AppLoader;
