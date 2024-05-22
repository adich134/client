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
    const response = await API.post("/route", data);
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
