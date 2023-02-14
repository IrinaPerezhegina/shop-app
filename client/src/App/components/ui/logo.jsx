import React from "react";
import styles from "../../scss/components/logo.module.scss";
import logo from "../../../App/assets/header/logo.svg";

const Logo = () => {
    return (
        <a className={styles.logoLink} href="/">
            <img src={logo} alt="Logo" />
        </a>
    );
};

export default Logo;
