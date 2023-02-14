import React from "react";
import styles from "./footer.module.scss";
import Logo from "../logo";
import Social from "../social";

const Footer = () => {
    return (
        <div className={styles.footerWrapper}>
            <div className={styles.footer}>
                <div>
                    <Logo />
                </div>
                <div className={styles.footerNavBar}>
                    <a href="/">Main</a>
                    <a href="/">Product</a>
                    <a href="/">About</a>
                    <a href="/">Review</a>
                </div>
                <div className={styles.FooterSocial}>
                    <div>Fullow us:</div>
                    <Social />
                </div>
            </div>
        </div>
    );
};

export default Footer;
