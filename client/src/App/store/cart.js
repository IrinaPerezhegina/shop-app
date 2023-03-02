// import { createSlice } from "@reduxjs/toolkit";
// import cartService from "../service/cart.service";

// const cartItemsFromLocalStorage = localStorage.getItem("cartItem")
//     ? JSON.parse(localStorage.getItem("cartItem"))
//     : [];

// const cartSlice = createSlice({
//     name: "cart",
//     initialState: {
//         cartItems: cartItemsFromLocalStorage,
//         error: null
//     },
//     reducers: {
//         cartAdd: (state, action) => {
//             const item = action.payload;

//             const existItem = state.cartItems.find(
//                 (x) => x.product === item.product
//             );
//             if (existItem) {
//                 return {
//                     ...state,
//                     cartItems: state.cartItems.map((x) =>
//                         x.product === existItem.product ? item : x
//                     )
//                 };
//             } else {
//                 return {
//                     ...state,
//                     cartItems: [...state.cartItems, item]
//                 };
//             }
//         },
//         cartRequestFiled: (state, action) => {
//             state.error = action.payload;
//             state.isLoading = false;
//         }
//     }
// });

// const { reducer: cartReducer, actions } = cartSlice;
// const { cartAdd, cartRequestFiled } = actions;

// export const addToCart = (payload) => async (dispatch, getState) => {
//     try {
//         const data = await cartService.addProductToCart(payload);
//         dispatch(
//             cartAdd({
//                 product: data._id,
//                 count: 1
//             })
//         );

//         // localStorage.setItem(
//         //     "cartItem",
//         //     JSON.stringify(getState().cart.cartItems)
//         // );
//     } catch (error) {
//         dispatch(cartRequestFiled(error.message));
//     }
// };

// export const getProductsList = () => (state) => {
//     return state.entities.cartItems;
// };
// export const getProductsLoadingStatus = () => (state) =>
//     state.products.isLoading;

// export default cartReducer;
