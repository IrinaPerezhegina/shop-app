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
    }
};

export default productsService;
