import React from "react";
import styles from "../../scss/components/social.module.scss";
import facebook from "../../../App/assets/login/facebook.svg";
import twitter from "../../../App/assets/login/twitter.svg";
import instagram from "../../../App/assets/login/instagram.svg";

const Social = () => {
    return (
        <div className={styles.socialWrapper}>
            <a className={styles.social} href="/">
                <img src={facebook} alt="facebook" />
            </a>
            <a className={styles.social} href="/">
                <img src={twitter} alt="twitter" />
            </a>
            <a className={styles.social} href="/">
                <img src={instagram} alt="instagram" />
            </a>
        </div>
    );
};

export default Social;
