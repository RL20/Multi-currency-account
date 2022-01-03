//clo
import React, { useState, useEffect } from "react";
import { getRate, getCurrencies } from "../api/currencyApi";
import Inputs from "./Inputs";
import ShowList from "./ShowList";

function ConvertionList({ text, parentCallBack, placeholder }) {
  const [currencies, setCurrencies] = useState(null);
  const [countries, setCountries] = useState(null);
  const [searchField, setSearchField] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const currenciesFromApi = async () => {
      const currenciesObj = await getCurrencies();
      const values = Object.values(currenciesObj.results); //get object
      const countriesName = values.map((county) => `${county.id}-${county.currencyName}`);
      setCountries(countriesName);
      setCurrencies(values);
    };
    currenciesFromApi();
    return () => {};
  }, []);

  useEffect(() => {
    parentCallBack(id);
  }, [id]);

  const handelInput = (input) => {
    setSearchField(input);
  };
  const getSelected = (childData) => {
    setId(childData);
  };

  // const c = JSON.parse(localStorage.getItem("val"));
  const res = currencies && currencies.filter((country) => country.id.replace(/ /g, "").toLowerCase().includes(searchField.toLowerCase()) || country.currencyName.replace(/ /g, "").toLowerCase().includes(searchField.toLowerCase()));
  // const res = c && c.filter((country) => country.id.replace(/ /g, "").toLowerCase().includes(searchField.toLowerCase()) || country.currencyName.replace(/ /g, "").toLowerCase().includes(searchField.toLowerCase()));

  // const res = c && c.filter((country) => country.id.toLowerCase().includes(searchField.toLowerCase()));
  // const res = c && c.filter((country) => country.id.toLowerCase().startsWith(searchField.toLowerCase()) || country.currencyName.toLowerCase().startsWith(searchField.toLowerCase()));
  // const res = currencies && currencies.filter((country) => country.id.toLowerCase().startsWith(searchField.toLowerCase()) || country.currencyName.toLowerCase().startsWith(searchField.toLowerCase()));
  // console.log(`res`, res);
  currencies && console.log(`currencies`, currencies);
  // countries && console.log(`countries`, countries);
  id && console.log("idddddddd", id);
  return (
    <div>
      <Inputs text={text} parentCallBack={handelInput} placeholder={placeholder} />
      {currencies && <ShowList options={res} getSelected={getSelected} />}

      {/* if(res.length===1) */}
      {/* <ShowList options={res} parentCallBack={parentCallBack} /> */}
    </div>
  );
}

export default ConvertionList;
