import React from "react";
import styles from "../Header/header.module.scss";
import Header from "./header";

const HeaderWrapper = () => {
    return (
        <div className={styles.headerWrapper}>
            <Header />
            <div className={styles.textHeader}>
                <h3>Bring power to your steps.</h3>
                <h1>Walk the line.</h1>
                <h6>Now that you have a ready strategy to move forward</h6>
                <h6>,it’s time to come up with some ideas.</h6>
                <h6>
                    Now that you have a <strong>ready strategy </strong>to move
                    forward,
                </h6>
                <h2 className={styles.textHeaderPrice}>
                    Price : $125 <span>$169</span>
                </h2>
                <div className={styles.buttomTextHeader}>
                    <button className={styles.buttomTextHeaderShpo}>
                        Shpo now
                    </button>
                    <button className={styles.buttomTextHeaderLern}>
                        Learn More
                    </button>
                </div>
                <div className={styles.TextHeaderАdvantages}>
                    <div>
                        <h2>70k</h2>
                        <h4>CUSTOMERS</h4>
                    </div>
                    <div>
                        <h2>17k</h2>
                        <h4>REVIEW</h4>
                    </div>
                </div>
            </div>
            <div className={styles.imgWrapper}>
                <div className={styles.mainElement}>
                    <div className={styles.auxiliaryElementOne}></div>
                    <div className={styles.auxiliaryElementTwo}>
                        <h2>
                            25% <br />
                            OFF
                        </h2>
                    </div>
                </div>
                <div className={styles.Carousel}>
                    <div className={styles.itemOne} type="button"></div>
                    <div className={styles.itemTwo} type="button"></div>
                    <div className={styles.itemThree} type="button"></div>
                </div>
            </div>
        </div>
    );
};

export default HeaderWrapper;
