import axios from "axios";

const API_KEY = "c0871b988be8fef239bb";

export default axios.create({
  baseURL: "https://intense-mesa-62220.herokuapp.com/https://free.currconv.com/api/v7/",
  params: {
    apiKey: API_KEY,
    compact: "ultra",
    // q: "USD_ILS,ILS_USD",
  },
});
