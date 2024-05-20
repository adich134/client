import axios from "axios";
import { apiValidator } from "../utils/apiValidator";

const API = axios.create({
  baseURL: "http://localhost:3030",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const route = async (query: string) => {
  try {
    const data: any = { query };
    console.log('ddddddddddddddddddddddd ', query)
    const response = await API.post("/route", data);
    // const response = await API.post(
    //   "/route",
    //   { query },
    //   {
    //     // timeout: 5000,
    //     // proxy: proxyConfig,
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //   }
    // );

    console.log(" adi adi adi---------------------- ", response)
    apiValidator.validateStatus(response, 201);

    return response.data;
  } catch (e) {
    return false;
  }
};

const getLastSearches = async () => {
  try {
    const response = await API.get("/last-searches", {});

    apiValidator.validateStatus(response, 200);

    return response.data;
  } catch (e) {
    return false;
  }
};

export const tripService = {
  route,
  getLastSearches,
};
