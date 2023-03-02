import httpService from "./http.service";

const imagesEndpoint = "images/";

const imagesService = {
    fetchAll: async () => {
        const { data } = await httpService.get(imagesEndpoint);
        console.log(data);
        return data;
    }
};

export default imagesService;
