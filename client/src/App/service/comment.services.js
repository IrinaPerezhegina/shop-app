import httpService from "./http.service";

const commentsEndpoint = "comments/";

const commentService = {
    createComment: async (payload) => {
        const { data } = await httpService.post(commentsEndpoint, payload);
        return data;
    },
    getComments: async (productId) => {
        const { data } = await httpService.get(commentsEndpoint + productId, {
            params: {
                orderBy: "productId",
                equalTo: `${productId}`
            }
        });

        return data;
    },
    removeComment: async (commentId) => {
        const { data } = await httpService.delete(commentsEndpoint + commentId);
        return data;
    }
};

export default commentService;
