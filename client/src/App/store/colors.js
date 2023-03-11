import { createSlice } from "@reduxjs/toolkit";
import colorsService from "../service/colors.service";

const colorsSlice = createSlice({
    name: "colors",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        colorsRequested: (state) => {
            state.isLoading = true;
        },
        colorsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.lastFetch = Date.now();
        },
        colorsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: colorsReducer, actions } = colorsSlice;
const { colorsRequested, colorsReceived, colorsRequestFiled } = actions;

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    } else return false;
}

export const loadColorsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().colors;
    if (isOutdated(lastFetch)) {
        dispatch(colorsRequested());
        try {
            const content = await colorsService.fetchAll();
            dispatch(colorsReceived(content));
        } catch (error) {
            dispatch(colorsRequestFiled(error.message));
        }
    }
};

export const getColors = () => (state) => state.colors.entities;
export const getColorsLoadingStatus = () => (state) => state.colors.isLoading;

export default colorsReducer;
