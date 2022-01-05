//clo rfce
import React, { useState, useEffect } from "react";
import { getRate, getCurrencies } from "../api/currencyApi";
import UserInfo from "./UserInfo";
import Header from "./Header";
import Log from "./Log";
import ConvertionList from "./ConvertionList";
import Account from "./Account";
import "../styles/App.css";
import Inputs from "./Inputs";
import Rates from "./Rates";

function App() {
  const [currency, setCurrency] = useState("");
  const [searchField, setSearchField] = useState("");
  const [curencyID, setCurencyID] = useState("");
  const [ratePairs, setRatePairs] = useState("");

  //!------------------------------
  // useEffect(() => {
  //   if (localStorage.getItem("data") === null) {
  //     let shouldRun = true;
  //     const fetchConvertData = async () => {
  //       const { data } = await currencyRoot.get(`convert`, {
  //         params: {
  //           q: "USD_ILS,ILS_USD",
  //         },
  //       });
  //       shouldRun && setCurrency(data);
  //       localStorage.setItem("data", JSON.stringify(data));
  //     };
  //     fetchConvertData();
  //     return () => {
  //       shouldRun = false;
  //     };
  //   }
  // }, []);
  //!-----------------------
  // useEffect(() => {
  //   let shouldRun = true;
  //   const fetchConvertData = async () => {
  //     const { data } = await currencyRoot.get(`convert`, {
  //       params: {
  //         q: "USD_ILS,ILS_USD",
  //       },
  //     });
  //     shouldRun && setCurrency(data);
  //   };
  //   fetchConvertData();
  //   return () => {
  //     shouldRun = false;
  //   };
  // }, []);

  useEffect(() => {
    const currenciesFromApi = async () => {
      const rate = await getRate();
      setRatePairs(rate);
    };
    currenciesFromApi();
    return () => {};
  }, []);

  const handelInput = (input) => {
    setSearchField(input);
  };
  const getCurencyId = (childDta) => {
    setCurencyID(childDta);
  };
  //!--------------
  const currencyObj = JSON.parse(localStorage.getItem("data"));
  const vall = Object.values(currencyObj);
  //!--------------
  console.log(`object`, vall[0]);
  console.log(`curencyID`, curencyID);
  return (
    <div className="App">
      {/* <Log /> */}
      <Header />
      {/* <Rates /> */}
      <UserInfo id={1} />
      <Account id={1} rate={2} />

      {/* <div className="convert">
        <Inputs text="Amount" parentCallBack={handelInput} value={searchField} />
        <br />
        <br />
        <ConvertionList text="Convert To" parentCallBack={getCurencyId} />
        <h2> Total {searchField}</h2>
      </div> */}
      {/* <div className="convert">
        <Inputs text="Amount" parentCallBack={handelInput} value={searchField} />
        <br />
        <br />
        <ConvertionList text="From" parentCallBack={getCurencyId} />
        <ConvertionList text="To" parentCallBack={getCurencyId} />
        <br />
        <h2> Total {searchField}</h2>
      </div> */}
    </div>
  );
}

export default App;
