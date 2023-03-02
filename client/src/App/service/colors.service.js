import httpService from "./http.service";

const colorsEndpoint = "colors/";

const colorsService = {
    fetchAll: async () => {
        const { data } = await httpService.get(colorsEndpoint);

        return data;
    }
};

export default colorsService;
