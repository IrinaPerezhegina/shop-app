import { nanoid } from "nanoid";
import React from "react";
import styles from "../../scss/libs/adminPage.module.scss";

const AdminCartHeader = () => {
    return (
        <header className={styles.cart_header} key={nanoid()}>
            <div className={styles.cart_headerArticle}>article</div>
            <div className={styles.cart_headerImage}>image</div>
            <div className={styles.cart_headerName}>name</div>
            <div className={styles.cart_headerCategory}>category</div>
            <div className={styles.cart_headerPrice}>price</div>
            <div className={styles.cart_headerQuantity}>rating</div>
            <div className={styles.cart_headerRating}>size</div>
            <div className={styles.cart_headerChange}></div>
        </header>
    );
};

export default AdminCartHeader;
