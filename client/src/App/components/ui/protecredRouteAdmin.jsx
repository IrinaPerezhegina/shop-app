import React from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
    getDataIsLoading,
    getIsAdminIn,
    getIsLoggedIn
} from "../../store/user";

function ProtectedRouteAdmin({ children }) {
    const location = useLocation();
    const isLoading = useSelector(getDataIsLoading());
    const isLoggedIn = useSelector(getIsLoggedIn());
    const isAdminIn = useSelector(getIsAdminIn());

    if (!isLoading && isLoggedIn && !isAdminIn) {
        return <Navigate to="/" state={{ referrer: location }} />;
    }
    return children;
}

ProtectedRouteAdmin.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRouteAdmin;
