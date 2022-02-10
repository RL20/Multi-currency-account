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
  const [id, setId] = useState("");
  const [message, setMessage] = useState("Getting exchange rate...");
  const [inputValue, setInputValue] = useState("");

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
  // console.log(`currencies`, currencies);
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
    console.log(`childData`, childData);
    setFromCurrency(childData);
  };
  const getSelectedTo = (childData) => {
    console.log(`childData`, childData);
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
      const msg1 = `1 ${fromCurrency} = ${ratePairs[`${fromCurrency}_${toCurrency}`]} ${toCurrency}`;
      const msg2 = ` 1 ${toCurrency} = ${ratePairs[`${toCurrency}_${fromCurrency}`]} ${fromCurrency}`;
      msg = msg1 + "\t\t\t" + msg2;

      //   msg = `1 ${fromCurrency} = ${ratePairs[`${fromCurrency}_${toCurrency}`]} ${toCurrency}
      // 1 ${toCurrency} = ${ratePairs[`${toCurrency}_${fromCurrency}`]} ${fromCurrency}`;
    } else if (ratePairsLength === 1) {
      if (toCurrency && toCurrency) msg = `1 ${fromCurrency} = ${ratePairs[`${fromCurrency}_${toCurrency}`]} ${toCurrency}`;
      else msg = "Please select currencies from the list";
    }
    setMessage(msg);
  };
  const handelInput = (input) => {
    setInputValue(input);
  };
  const switchOrder = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };
  const rateFromInput = inputValue * ratePairs[`${fromCurrency}_${toCurrency}`]?.toFixed(2);
  // const rateFromInput = inputValue && ratePairs && inputValue * ratePairs[`${fromCurrency}_${toCurrency}`]; //.toFixed(2);
  const rateFromInputPrint = `${inputValue} ${fromCurrency} = ${rateFromInput} ${toCurrency} `;
  console.log("rateFromInput", typeof rateFromInput);
  return (
    <div className="main">
      <div className="wrapper">
        <header>Currency Converter</header>
        <form action="#">
          <div className="amount">
            <p>Enter Amount</p>
            <input type="text" onChange={(e) => handelInput(e.target.value)} />
          </div>
          <div className="drop-list">
            <div className="from">
              <p>From</p>
              <div className="select-box">
                {currencies && <ShowList options={res} getSelected={getSelectedFrom} valueFromfather={fromCurrency} />}
                {/* <img src="https://flagcdn.com/48x36/us.png" alt="flag" />
                <select> {cur} </select> */}
                {/*<select> {<!-- Options tag are inserted from JavaScript -->} </select>*/}
              </div>
            </div>
            <div className="icon" onClick={switchOrder}>
              <i className="fas fa-exchange-alt"></i>
            </div>
            <div className="to">
              <p>To</p>
              <div className="select-box">
                {/* <img src="https://flagcdn.com/48x36/np.png" alt="flag" />
                <select> {cur}</select> */}
                {currencies && <ShowList options={res} getSelected={getSelectedTo} valueFromfather={toCurrency} />}
              </div>
            </div>
          </div>
          <div className="exchange-rate">{message}</div>
          <div className="exchange-rate">{inputValue && rateFromInputPrint}</div>
          <button onClick={insert}>Get Exchange Rate</button>
        </form>
      </div>
    </div>
  );
}

export default Rates;
