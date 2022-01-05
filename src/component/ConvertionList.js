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

  const res = currencies && currencies.map((country) => country);
  // const res = currencies && currencies.filter((country) => country.id.replace(/ /g, "").toLowerCase().includes(searchField.toLowerCase()) || country.currencyName.replace(/ /g, "").toLowerCase().includes(searchField.toLowerCase()));

  // currencies && console.log(`currencies`, currencies);
  return (
    <div>
      {/* <Inputs text={text} parentCallBack={handelInput} placeholder={placeholder} /> */}
      {currencies && <ShowList options={res} getSelected={getSelected} />}
    </div>
  );
}

export default ConvertionList;
