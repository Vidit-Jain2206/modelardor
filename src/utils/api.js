import axios from "axios";

const BASE_URL = "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com";

const options = {
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_ECOMMERCE_API_KEY,
    "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
  },
};

export const fetchDataFromApi = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);
  return data;
};
