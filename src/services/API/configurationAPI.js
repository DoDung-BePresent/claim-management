import axios from "axios";

export const createConfigAPI = (listName) => {
  return axios.create({
    baseURL: `https://67bae943fbe0387ca1387e73.mockapi.io/api/claim-project/${listName}`,
    timeout: 10000,
  });
};

export const getConfigAPI = (listName) => {
  return axios.create({
    baseURL: `https://67bae943fbe0387ca1387e73.mockapi.io/api/claim-project/${listName}`,
    timeout: 10000,
  });
}

