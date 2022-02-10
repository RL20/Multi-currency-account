import React, { useState, useEffect } from "react";
// import { useEffect } from "react/cjs/react.development";
import { Dropdown } from "semantic-ui-react";
// import countriesCodes from "../countriesCode.js";

// const countriesCodesObj = countriesCodes.reduce((acc, cur) => {
//   return { ...acc, [cur.alphaCurrencyCode]: cur };
// }, {});

const ShowList = ({ options, getSelected, valueFromfather }) => {
  const DropdownExampleSearchSelection = () => <Dropdown value={valueFromfather} placeholder="Select Country" fluid search selection options={countryOptions} onChange={handleDropDownSelect} />;
  // console.log(`show`);
  const [selectedOption, setSelectedOption] = useState("");
  // console.log(`selected`, selectedOption);
  useEffect(() => {
    getSelected(selectedOption);
  }, [selectedOption, getSelected]);
  // useEffect(() => {
  //   getSelected(selectedOption);
  // }, [getSelected, options, selectedOption]);

  const countryOptions = options.map((country, i) => {
    // console.log(`country.id.`, country.id);
    // const flg = countriesCodesObj[country.id] ? countriesCodesObj[country.id].alpha2.toLowerCase() : "";
    // <div className="currency-flag currency-flag-usd"></div>

    let str = `currency-flag currency-flag-${country.id.toLowerCase()} `;
    // console.log(`str`, str);
    const flg = <div className={str}></div>;
    return { key: country.id, value: country.id, flag: flg, text: `${country.id}-${country.currencyName}` };
  });
  const handleDropDownSelect = (event, data) => {
    console.log("data.value", data.value);
    setSelectedOption(data.value);
  };
  // console.log(`countriesCodes`, countriesCodesObj);
  return <>{DropdownExampleSearchSelection()}</>;
};

export default ShowList;
