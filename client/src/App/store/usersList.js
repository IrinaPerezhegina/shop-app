import { createSlice } from "@reduxjs/toolkit";

import userService from "../service/user.service";

const usersListSlice = createSlice({
    name: "usersList",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceived: (state, action) => {
            state.entities = action.payload;
            state.dataLoaded = true;
            state.isLoading = false;
        },
        usersRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: usersListReducer, actions } = usersListSlice;
const { usersRequested, usersReceived, usersRequestFiled } = actions;

export const loadUsersList = () => async (dispatch) => {
    dispatch(usersRequested());
    try {
        const content = await userService.get();
        dispatch(usersReceived(content));
    } catch (error) {
        dispatch(usersRequestFiled(error.message));
    }
};
export const getUsersList = () => (state) => {
    return state.usersList.entities;
};
export const getUsersLoadingStatus = () => (state) => state.usersList.isLoading;

export default usersListReducer;
