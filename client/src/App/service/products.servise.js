import httpService from "./http.service";

const productsEndpoint = "products";

const productsService = {
    fetchAll: async () => {
        const { data } = await httpService.get(productsEndpoint);
        return data;
    }
};

export default productsService;
