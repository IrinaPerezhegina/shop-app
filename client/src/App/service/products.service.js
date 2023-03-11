import httpService from "./http.service";

const productsEndpoint = "products/";

const productsService = {
    fetchAll: async () => {
        const { data } = await httpService.get(productsEndpoint);
        return data;
    },
    getProduct: async (productId) => {
        const { data } = await httpService.get(productsEndpoint + productId);
        return data;
    },
    update: async (payload, productId) => {
        const { data } = await httpService.patch(
            productsEndpoint + productId,
            payload
        );
        return data;
    },
    createProduct: async (payload) => {
        const { data } = await httpService.post(productsEndpoint, payload);

        return data;
    },
    removeProduct: async (productId) => {
        const { data } = await httpService.delete(productsEndpoint + productId);
        return data;
    }
};

export default productsService;
