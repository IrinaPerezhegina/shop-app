import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../components/ui/Footer/footer";
import Header from "../components/ui/Header/header";
import ProductCard from "../components/ui/productСard/productСard";
import styles from "../scss/libs/home.module.scss";
import SortSelect from "../components/ui/sortSelect";
import SpinnerComponent from "../components/ui/spinner";
import { GoSearch } from "react-icons/go";
import _ from "lodash";
import {
    getProductsList,
    getProductsLoadingStatus,
    loadProductsList
} from "../store/products";

import Pagination from "../components/Paginate/Pagination";
import { paginate } from "../utils/paginate";
import GroupList from "../components/ui/groupList";

const MainPage = () => {
    const isLoading = useSelector(getProductsLoadingStatus());
    const products = useSelector(getProductsList());
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedСategory, setSelectedСategory] = useState();
    const [sortSign, setSortSign] = useState("priceASC");
    const [sortProducts, setSortProducts] = useState(products);
    const [searchQuery, setSearchQuery] = useState("");
    const pageSize = 6;

    const handleChangeSortSign = (e) => {
        setSortSign(e.target.value);
    };
    const sortOptions = [
        {
            value: "priceASC",
            label: "Цена по возрастанию",
            sort: (products) => _.orderBy(products, ["price"], ["asc"])
        },
        {
            value: "priceDESC",
            label: "Цена по убыванию",
            sort: (products) => _.orderBy(products, ["price"], ["desc"])
        },
        {
            value: "ratingASC",
            label: "Рейтинг по возрастанию",
            sort: (products) => _.orderBy(products, ["rating.rate"], ["asc"])
        },
        {
            value: "ratingDESC",
            label: "Рейтинг по убыванию",
            sort: (products) => _.orderBy(products, ["rating.rate"], ["desc"])
        }
    ];
    useEffect(() => {
        dispatch(loadProductsList());
    }, [dispatch]);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedСategory, searchQuery]);

    function getCategory(products) {
        return [...new Set(products?.map((product) => product.category))];
    }

    const handleSearchQuery = ({ target }) => {
        setSelectedСategory(undefined);
        setSearchQuery(target.value);
    };

    const handleCategorySelect = (item) => {
        if (searchQuery !== "") setSearchQuery("");
        if (item === "ALL SNEAKERS") {
            setSelectedСategory("ALL SNEAKERS");
            setSearchQuery("");
        } else setSelectedСategory(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const addedToCart = (id) => {
        console.log(id);
    };

    function filterProducts(data) {
        const filteredProducts = searchQuery
            ? data.filter(
                  (product) =>
                      product.title
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1
              )
            : selectedСategory && selectedСategory !== "ALL SNEAKERS"
            ? data.filter(
                  (product) =>
                      product.category.toLowerCase() === selectedСategory
              )
            : data;
        return filteredProducts;
    }

    const filteredProducts = filterProducts(products);
    const count = filteredProducts?.length;

    useEffect(() => {
        const findOption = sortOptions.find(({ value }) => value === sortSign);
        if (findOption) {
            setSortProducts(findOption.sort(filteredProducts));
        } else {
            setSortProducts(filteredProducts);
        }
    }, [sortSign, selectedСategory, searchQuery]);
    useEffect(() => {
        setSortProducts(products);
    }, [products]);
    const usersCrop = paginate(sortProducts, currentPage, pageSize);

    return (
        <>
            <Header />
            {isLoading ? (
                <SpinnerComponent />
            ) : (
                <div className={styles.content}>
                    <div className={styles.content__setup}>
                        <div className={styles.content__setupCategory}>
                            <GroupList
                                selectedItem={selectedСategory}
                                category={getCategory(products)}
                                onItemSelect={handleCategorySelect}
                            />
                        </div>
                        <div className={styles.content__setupSearch}>
                            <GoSearch
                                className={styles.content__setupSearchIcon}
                            />
                            <input
                                onChange={handleSearchQuery}
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                            />
                        </div>
                        <div className={styles.content__setupSort}>
                            <SortSelect
                                value={sortSign}
                                options={sortOptions}
                                onSort={handleChangeSortSign}
                            />
                        </div>
                    </div>
                    <div className={styles.content__carts}>
                        {usersCrop?.map((product) => (
                            <ProductCard
                                id={product._id}
                                onClick={addedToCart}
                                key={product._id}
                                rating={product.rating}
                                title={product.title}
                                price={product.price}
                                image={product.image}
                            />
                        ))}
                    </div>
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
};

export default MainPage;
