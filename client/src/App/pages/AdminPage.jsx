import React, { useEffect, useState } from "react";
import Header from "../components/ui/Header/header";
import Footer from "../components/ui/Footer/footer";
import styles from "../scss/libs/adminPage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
    getProductsList,
    loadProductsList,
    removeProduct
} from "../store/products";
import SpinnerComponent from "../components/ui/spinner";
import AdminCartProduct from "../components/ui/adminCartProduct";
import Pagination from "../components/Paginate/Pagination";
import { paginate } from "../utils/paginate";
import AdminCartHeader from "../components/ui/adminCartHeader";
import ModalWindowCreateProduct from "../components/ui/modalWindows/modalWindowCreateProduct";
import ModalWindowChangeProduct from "../components/ui/modalWindows/modalWindowChangeProduct";
import { nanoid } from "nanoid";

const AdminPage = () => {
    const [id, setId] = useState(null);
    const [modalShow, setModalShow] = React.useState(false);
    const [modalShowChange, setModalShowChange] = React.useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const products = useSelector(getProductsList());
    function handleClick(id) {
        return setId(id);
    }

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadProductsList());
    }, [dispatch]);
    const pageSize = 6;
    useEffect(() => {
        setCurrentPage(1);
    }, [products]);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleRemoveProduct = (productId) => {
        dispatch(removeProduct(productId));
    };
    const productsCrop = paginate(products, currentPage, pageSize);
    return (
        <>
            <Header />
            {products ? (
                <section className={styles.sectionCart} key={nanoid()}>
                    <div className={styles.sectionCart_body}>
                        <div className={styles.container}>
                            <section className={styles.cart}>
                                <ModalWindowCreateProduct
                                    key={nanoid()}
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                                <ModalWindowChangeProduct
                                    _id={id}
                                    key={nanoid()}
                                    show={modalShowChange}
                                    onHide={() => setModalShowChange(false)}
                                />
                                <AdminCartHeader />
                                {productsCrop?.map(
                                    ({
                                        price,
                                        article,
                                        image,
                                        _id,
                                        title,
                                        category,
                                        rating,
                                        size
                                    }) => (
                                        <>
                                            <AdminCartProduct
                                                onHide={() =>
                                                    setModalShowChange(true)
                                                }
                                                onRemove={handleRemoveProduct}
                                                onClick={handleClick}
                                                price={price}
                                                article={article}
                                                image={image}
                                                _id={_id}
                                                title={title}
                                                category={category}
                                                rating={rating}
                                                size={size}
                                            />
                                        </>
                                    )
                                )}
                                <div className={styles.cart_footer}>
                                    <div className={styles.cart_footerBtn}>
                                        <button
                                            onClick={() => setModalShow(true)}
                                        >
                                            add a product
                                        </button>
                                    </div>
                                </div>
                            </section>
                            <div className="d-flex justify-content-center">
                                <Pagination
                                    itemsCount={products.length}
                                    pageSize={pageSize}
                                    currentPage={currentPage}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <SpinnerComponent />
            )}

            <Footer />
        </>
    );
};

export default AdminPage;
