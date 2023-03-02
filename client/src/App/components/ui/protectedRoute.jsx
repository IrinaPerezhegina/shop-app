import React from "react";
import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../../store/user";

function ProtectedRoute({ children }) {
    const location = useLocation();
    const isLoggedIn = useSelector(getIsLoggedIn());
    if (isLoggedIn) {
        return <Navigate to="/" state={{ referrer: location }} />;
    }
    return children;
}

ProtectedRoute.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default ProtectedRoute;
