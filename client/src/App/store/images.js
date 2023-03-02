import { createSlice } from "@reduxjs/toolkit";
import imagesService from "../service/images.service";

const colorsSlice = createSlice({
    name: "images",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        imagesRequested: (state) => {
            state.isLoading = true;
        },
        imagesReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
            state.lastFetch = Date.now();
        },
        imagesRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: imagesReducer, actions } = colorsSlice;
const { imagesRequested, imagesReceived, imagesRequestFiled } = actions;

function isOutdated(date) {
    if (Date.now() - date > 10 * 60 * 1000) {
        return true;
    } else return false;
}

export const loadImagesList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().images;
    if (isOutdated(lastFetch)) {
        dispatch(imagesRequested());
        try {
            const content = await imagesService.fetchAll();
            console.log(content);
            dispatch(imagesReceived(content));
        } catch (error) {
            dispatch(imagesRequestFiled(error.message));
        }
    }
};

export const getImages = () => (state) => state.images.entities;
export const getImagesLoadingStatus = () => (state) => state.images.isLoading;
// export const getQualitiesByIds = (qualitiesIds) => (state) => {
//     if (state.qualities.entities) {
//         const qualitiesArray = [];
//         for (const qualId of qualitiesIds) {
//             for (const quality of state.qualities.entities) {
//                 if (quality._id === qualId) {
//                     qualitiesArray.push(quality);
//                     break;
//                 }
//             }
//         }

//         return qualitiesArray;
//     }
//     return [];
// };
export default imagesReducer;
