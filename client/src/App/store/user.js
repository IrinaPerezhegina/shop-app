import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../service/auth.service";
import localStorageService from "../service/localStorage.service";
import userService from "../service/user.service";
import { generateAuthError } from "../utils/generateAuthError";
// import history from "../utils/history";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataLoaded: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataLoaded: false
      };

const usersSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userRequested: (state) => {
            state.isLoading = true;
        },
        userReceived: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        userRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggedIn = true;
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload;
        },
        userLoggedOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
            state.auth = null;
            state.dataLoaded = false;
        },

        authRequested: (state) => {
            state.error = null;
        },

        cartAdd: (state, action) => {
            const item = action.payload;

            const existItem = state.entities.cartItems.findIndex(
                (x) => x._id === item._id
            );

            if (existItem >= 0) {
                return {
                    ...state,
                    entities: {
                        ...state.entities,
                        cartItems: state.entities.cartItems.map((elem) =>
                            elem._id === item._id
                                ? {
                                      count: elem.count + 1,
                                      _id: item._id,
                                      color: item.color,
                                      size: item.size
                                  }
                                : elem
                        )
                    }
                };
            } else {
                return {
                    ...state,
                    entities: {
                        ...state.entities,
                        cartItems: [...state.entities.cartItems, item]
                    }
                };
            }
        },
        reducePosition: (state, action) => {
            const item = action.payload;

            return {
                ...state,
                entities: {
                    ...state.entities,
                    cartItems: state.entities.cartItems.map((elem) =>
                        elem._id === item._id
                            ? {
                                  ...elem,
                                  count: elem.count - 1
                              }
                            : elem
                    )
                }
            };
        },
        deletePosition: (state, action) => {
            const item = action.payload;

            return {
                ...state,
                entities: {
                    ...state.entities,
                    cartItems: state.entities.cartItems.filter(
                        (elem) => elem._id !== item._id
                    )
                }
            };
        },
        cartRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        deleteBasket: (state, action) => {
            return {
                ...state,
                entities: {
                    ...state.entities,
                    cartItems: []
                }
            };
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    cartAdd,
    deletePosition,
    reducePosition,
    userRequested,
    userReceived,
    userRequestFiled,
    authRequestSuccess,
    authRequestFailed,
    userLoggedOut,
    cartRequestFailed,
    deleteBasket
} = actions;

const authRequested = createAction("user/authRequested");

export const emptyBasket = (payload) => async (dispatch) => {
    try {
        await userService.update(payload);

        dispatch(deleteBasket());
    } catch (error) {
        dispatch(cartRequestFailed(error.message));
    }
};
export const deleteByOnePosition = (payload) => async (dispatch, getState) => {
    try {
        await userService.update(payload);

        dispatch(deletePosition(payload));
    } catch (error) {
        dispatch(cartRequestFailed(error.message));
    }
};

export const addToCart = (payload) => async (dispatch, getState) => {
    try {
        await userService.update(payload);

        dispatch(cartAdd(payload));
    } catch (error) {
        dispatch(cartRequestFailed(error.message));
    }
};
export const reduceByOnePosition = (payload) => async (dispatch, getState) => {
    try {
        await userService.update(payload);

        dispatch(reducePosition(payload));
    } catch (error) {
        dispatch(cartRequestFailed(error.message));
    }
};

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
};

export const login = (payload) => async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
        const data = await authService.login({ email, password });
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({ userId: data.userId }));
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(authRequestFailed(errorMessage));
        } else {
            dispatch(authRequestFailed(error.message));
        }
    }
};

export const signUp = (payload) => async (dispatch) => {
    dispatch(authRequested());

    try {
        const data = await authService.register(payload);
        localStorageService.setTokens(data);
        dispatch(
            authRequestSuccess({
                userId: data.userId
            })
        );
    } catch (error) {
        const { code, message } = error.response.data.error;
        if (code === 400) {
            const errorMessage = generateAuthError(message);
            dispatch(authRequestFailed(errorMessage));
        } else {
            dispatch(authRequestFailed(error.message));
        }
    }
};

export const loadUserCurrent = () => async (dispatch) => {
    dispatch(userRequested());
    try {
        const content = await userService.getCurrentUser();
        dispatch(userReceived(content));
    } catch (error) {
        dispatch(userRequestFiled(error.message));
    }
};

export const getDataIsLoading = () => (state) => state.user.isLoading;
export const getDataStatus = () => (state) => state.user.dataLoaded;
export const getIsLoggedIn = () => (state) => state.user.isLoggedIn;
export const getIsAdminIn = () => (state) => {
    if (state.user.entities) {
        return state.user.entities.isAdmin;
    } else return false;
};
export const getCurrentUserId = () => (state) => state.user.auth;
export const getCurrentBasket = () => (state) => {
    if (state.user.entities) {
        return state.user.entities.cartItems;
    } else return [];
};

export const getUserLoadingStatus = () => (state) => state.user.isLoading;
export const getCurrentUserData = () => (state) => state.user.entities;
export const getAuthErrors = () => (state) => state.user.error;

export default usersReducer;
