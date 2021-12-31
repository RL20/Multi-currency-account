//clo
import React, { useState, useEffect } from "react";
import axios from "axios";
import currencyRoot from "../api/currencyRoot";
import Inputs from "./Inputs";
import ShowList from "./ShowList";

function ConvertionList() {
  const [currencies, setCurrency] = useState([]);
  const [countries, setCountries] = useState([]);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    if (localStorage.getItem("val") === null) {
      const fetchData = async () => {
        const { data } = await currencyRoot.get(`currencies`, {});
        // const val = Object.keys(data.results);
        const val = Object.values(data.results);
        const countriesName = val.map((county) => `${county.id}-${county.currencyName}`);
        setCountries(countriesName);
        setCurrency(val);
        localStorage.setItem("val", JSON.stringify(val));
        localStorage.setItem("countriesName", JSON.stringify(countriesName));
      };
      fetchData();
    }
  }, []);
  const handelInput = (input) => {
    setSearchField(input);
  };
  const c = JSON.parse(localStorage.getItem("val"));
  const res = c && c.filter((country) => country.id.toLowerCase().startsWith(searchField.toLowerCase()) || country.currencyName.toLowerCase().startsWith(searchField.toLowerCase()));
  // const res = currencies && currencies.filter((country) => country.id.toLowerCase().startsWith(searchField.toLowerCase()) || country.currencyName.toLowerCase().startsWith(searchField.toLowerCase()));

  return (
    <div>
      <Inputs text="Search" parentCallBack={handelInput} />
      <ShowList item={res} />
    </div>
  );
}

export default ConvertionList;
