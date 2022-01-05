import React, { useState, useEffect, useRef } from "react";
import "../styles/Rates.css";
import { getRateObj, getCurrencies } from "../api/currencyApi";
import ShowList from "./ShowList";

function Rates() {
  const [currency, setCurrency] = useState("");
  const [searchField, setSearchField] = useState("");
  const [curencyID, setCurencyID] = useState("");
  const [ratePairs, setRatePairs] = useState("");
  const [currencies, setCurrencies] = useState(null);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [tempCode, setTempCode] = useState("");
  const [id, setId] = useState("");
  const [message, setMessage] = useState("Getting exchange rate...");

  useEffect(() => {
    const currenciesFromApi = async () => {
      // const rate = await getRate(`{user.currencyName}_{curencyID}`);
      const rate = await getRateObj(`${fromCurrency}_${toCurrency},${toCurrency}_${fromCurrency}`);
      // const rate = await getRate(`USD_ILS`);
      setRatePairs(rate);
    };
    currenciesFromApi();
    return () => {};
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    const currenciesFromApi = async () => {
      const currenciesObj = await getCurrencies();
      const values = Object.values(currenciesObj.results); //get object
      const countriesName = values.map((county) => `${county.id}-${county.currencyName}`);
      // const currenciesObj = await getCurrencies();
      // const values = currenciesObj && Object.values(currenciesObj.results); //get object
      // const countriesName = values && values.map((county) => `${county.id}-${county.currencyName}`);
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
  const res = currencies && currencies.map((country) => country);

  const getSelectedFrom = (childData) => {
    setFromCurrency(childData);
  };
  const getSelectedTo = (childData) => {
    setToCurrency(childData);
  };
  const insert = async (e) => {
    e.preventDefault();
    // const newUser = await updateUser(id, obj);
    console.log(`ratePairs`, ratePairs);
    const ratePairsLength = Object.keys(ratePairs).length;
    let msg = "There was a problem procces your request please try again";
    console.log(`ratePairsLength`, ratePairsLength);
    if (ratePairsLength === 2) {
      msg = `1 ${fromCurrency} = ${ratePairs[`${fromCurrency}_${toCurrency}`]} ${toCurrency}
    1 ${toCurrency} = ${ratePairs[`${toCurrency}_${fromCurrency}`]} ${fromCurrency}`;
    } else if (ratePairsLength === 1) {
      msg = `1 ${fromCurrency} = ${ratePairs[`${fromCurrency}_${toCurrency}`]} ${toCurrency}`;
    }
    setMessage(msg);
  };
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
                {currencies && <ShowList options={res} getSelected={getSelectedFrom} />}
                {/* <img src="https://flagcdn.com/48x36/us.png" alt="flag" />
                <select> {cur} </select> */}
                {/*<select> {<!-- Options tag are inserted from JavaScript -->} </select>*/}
              </div>
            </div>
            <div class="icon" onClick={1}>
              <i class="fas fa-exchange-alt"></i>
            </div>
            <div class="to">
              <p>To</p>
              <div class="select-box">
                {/* <img src="https://flagcdn.com/48x36/np.png" alt="flag" />
                <select> {cur}</select> */}
                {currencies && <ShowList options={res} getSelected={getSelectedTo} />}
              </div>
            </div>
          </div>
          <div class="exchange-rate">{message}</div>
          <button onClick={insert}>Get Exchange Rate</button>
        </form>
      </div>
    </div>
  );
}

export default Rates;
