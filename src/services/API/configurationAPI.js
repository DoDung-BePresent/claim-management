import axios from "axios";

export const createConfigAPI = (listName) => {
  return axios.create({
    baseURL: `https://67bafe5bfbe0387ca138bcd1.mockapi.io/api/claim-project/${listName}`,
    timeout: 10000,
  });
};

export const getConfigAPI = (listName) => {
  return axios.create({
    baseURL: `https://67bafe5bfbe0387ca138bcd1.mockapi.io/api/claim-project/${listName}`,
    timeout: 10000,
  });
};
