import { AxiosResponse } from "axios";

const validateStatus = (response: AxiosResponse, code: number) => {
  if (response.status !== code) {
    throw new Error(`Request failed: status code ${response.status} `);
  }
};

export const apiValidator = {
  validateStatus,
};
