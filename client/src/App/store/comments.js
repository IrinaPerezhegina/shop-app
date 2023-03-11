import { createAction, createSlice } from "@reduxjs/toolkit";
import commentService from "../service/comment.services";

const commentsSlice = createSlice({
    name: "comments",
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true;
        },
        commentsReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        commentsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        createCommentsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        createCommentsReceived: (state, action) => {
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        removeCommentsRequestFiled: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        removeCommentsReceived: (state, action) => {
            state.entities = state.entities.filter(
                (el) => el._id !== action.payload
            );
        }
    }
});

const { reducer: commentsReducer, actions } = commentsSlice;
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFiled,
    createCommentsRequestFiled,
    createCommentsReceived,
    removeCommentsRequestFiled,
    removeCommentsReceived
} = actions;

const createCommentRequested = createAction("comments/createCommentRequested");
const removeCommentRequested = createAction("comments/removeCommentRequested");

export const removeComment = (id) => async (dispatch) => {
    dispatch(removeCommentRequested());
    try {
        const { content } = await commentService.removeComment(id);

        if (!content) {
            dispatch(removeCommentsReceived(id));
        }
    } catch (error) {
        dispatch(removeCommentsRequestFiled(error.message));
    }
};

export const createComment = (payload) => async (dispatch) => {
    dispatch(createCommentRequested());
    try {
        const content = await commentService.createComment(payload);
        dispatch(createCommentsReceived(content));
    } catch (error) {
        dispatch(createCommentsRequestFiled(error.message));
    }
};

export const loadCommentsList = (productId) => async (dispatch) => {
    dispatch(commentsRequested());
    try {
        const content = await commentService.getComments(productId);

        dispatch(commentsReceived(content));
    } catch (error) {
        dispatch(commentsRequestFiled(error.message));
    }
};
export const getComments = () => (state) => state.comments.entities;
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading;

export default commentsReducer;
