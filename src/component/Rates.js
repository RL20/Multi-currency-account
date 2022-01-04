import React, { useState, useEffect, useRef } from "react";
import "../styles/Rates.css";
import { getRate, getCurrencies } from "../api/currencyApi";

function Rates() {
  const [currency, setCurrency] = useState("");
  const [searchField, setSearchField] = useState("");
  const [curencyID, setCurencyID] = useState("");
  const [ratePairs, setRatePairs] = useState("");
  const [currencies, setCurrencies] = useState(null);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [tempCode, setTempCode] = useState("");

  useEffect(() => {
    const currenciesFromApi = async () => {
      const rate = await getRate(`{user.currencyName}_{curencyID}`);
      setRatePairs(rate);
    };
    currenciesFromApi();
    return () => {};
  }, [curencyID]);

  useEffect(() => {
    const currenciesFromApi = async () => {
      const currenciesObj = await getCurrencies();
      const values = Object.values(currenciesObj.results); //get object
      const countriesName = values.map((county) => `${county.id}-${county.currencyName}`);
      setCurrencies(values);
    };
    currenciesFromApi();
    return () => {};
  }, []);
  console.log(`currencies`, currencies);
  const cur =
    currencies &&
    currencies.map((country, i) => {
      return (
        <option key={i} value={country.id}>
          {country.currencyName}{" "}
        </option>
      );
    });

  return (
    <div className="main">
      <div class="wrapper">
        <header>Currency Converter</header>
        <form action="#">
          <div class="amount">
            <p>Enter Amount</p>
            <input type="text" />
          </div>
          <div class="drop-list">
            <div class="from">
              <p>From</p>
              <div class="select-box">
                <img src="https://flagcdn.com/48x36/us.png" alt="flag" />
                <select> {cur} </select>
                {/*<select> {<!-- Options tag are inserted from JavaScript -->} </select>*/}
              </div>
            </div>
            <div class="icon" onClick={1}>
              <i class="fas fa-exchange-alt"></i>
            </div>
            <div class="to">
              <p>To</p>
              <div class="select-box">
                <img src="https://flagcdn.com/48x36/np.png" alt="flag" />
                <select> {cur}</select>
              </div>
            </div>
          </div>
          <div class="exchange-rate">Getting exchange rate...</div>
          <button>Get Exchange Rate</button>
        </form>
      </div>
    </div>
  );
}

export default Rates;
