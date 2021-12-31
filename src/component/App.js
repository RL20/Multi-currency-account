//clo rfce
import React, { useState, useEffect } from "react";
import axios from "axios";
import currencyRoot from "../api/currencyRoot";
import ConvertionList from "./ConvertionList";
import Account from "./Account";
import "../styles/App.css";
import Inputs from "./Inputs";

function App() {
  const [currency, setCurrency] = useState("");
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    if (localStorage.getItem("data") === null) {
      let shouldRun = true;
      const fetchConvertData = async () => {
        const { data } = await currencyRoot.get(`convert`, {
          params: {
            q: "USD_ILS,ILS_USD",
          },
        });
        shouldRun && setCurrency(data);
        localStorage.setItem("data", JSON.stringify(data));
      };
      fetchConvertData();
      return () => {
        shouldRun = false;
      };
    }
  }, []);
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

  const handelInput = (input) => {
    setSearchField(input);
  };
  console.log("currency*****88*****", JSON.parse(localStorage.getItem("data")));

  return (
    <div>
      heooo
      <div className="convert">
        <Inputs text="Amount" parentCallBack={handelInput} />
        <ConvertionList />
        <ConvertionList />
        Total {}
      </div>
      <Account id={1} />
    </div>
  );
}

export default App;
