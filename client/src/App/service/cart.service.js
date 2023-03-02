import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const cartEndpoint = "carts/";

const cartService = {
    fetchAll: async () => {
        const { data } = await httpService.get(cartEndpoint);
        return data;
    },
    getCartById: async (userId) => {
        const { data } = await httpService.get(cartEndpoint + userId);
        return data;
    },
    addProductToCart: async (payload) => {
        const { data } = await httpService.patch(
            cartEndpoint + localStorageService.getUserId(),
            payload
        );

        return data;
    }
};

export default cartService;
