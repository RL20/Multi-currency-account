import axios from "axios";

// const API_KEY = "c0871b988be8fef239bb";
const API_KEY = "f005dc959d8e6a59bf2d";

const api = axios.create({
  baseURL: "https://intense-mesa-62220.herokuapp.com/https://free.currconv.com/api/v7/",
  params: {
    apiKey: API_KEY,
    compact: "ultra",
    // q: "USD_ILS,ILS_USD",
  },
});

export const getRate = async (str) => {
  try {
    // console.log(`str`, str);
    const { data } = await api.get(`convert`, {
      params: {
        q: str,
        // q: "USD_ILS,ILS_USD",
      },
    });
    // console.log("dataggggggggggg", data);
    return data[str];
  } catch (e) {
    console.log(e.message);
  }
};
export const getRateObj = async (str) => {
  try {
    // console.log(`str`, str);
    const { data } = await api.get(`convert`, {
      params: {
        q: str,
        // q: "USD_ILS,ILS_USD",
      },
    });
    return data;
  } catch (e) {
    console.log(e.message);
  }
};

export const getCurrencies = async () => {
  try {
    const { data } = await api.get(`currencies`, {});
    return data;
  } catch (e) {
    console.log(e.message);
  }
};
