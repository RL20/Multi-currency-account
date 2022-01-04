import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { Dropdown } from "semantic-ui-react";
import countriesCodes from "../countriesCode.js";
// const countryOptions = [
//   { key: "af", value: "af", flag: "af", text: "Afghanistan" },
//   { key: "ax", value: "ax", flag: "ax", text: "Aland Islands" },
//   { key: "al", value: "al", flag: "al", text: "Albania" },
// ];
const countriesCodesObj = countriesCodes.reduce((acc, cur) => {
  return { ...acc, [cur.alphaCurrencyCode]: cur };
}, {});

const ShowList = ({ options, getSelected }) => {
  const DropdownExampleSearchSelection = () => <Dropdown placeholder="Select Country" fluid search selection options={countryOptions} onChange={handleDropDownSelect} />;
  console.log(`show`);
  const [selectedOption, setSelectedOption] = useState("");
  console.log(`selected`, selectedOption);
  useEffect(() => {
    getSelected(selectedOption);
  }, [getSelected, options, selectedOption]);

  const countryOptions = options.map((country, i) => {
    console.log(`country.id.`, country.id);
    const flg = countriesCodesObj[country.id] ? countriesCodesObj[country.id].alpha2.toLowerCase() : "";
    return { key: country.id, value: country.id, flag: flg, text: `${country.id}-${country.currencyName}` };
  });
  const handleDropDownSelect = (event, data) => {
    console.log("data.value", data.value);
    setSelectedOption(data.value);
  };
  console.log(`countriesCodes`, countriesCodesObj);
  // console.log(`countriesCodes`, countriesCodes);
  return <>{DropdownExampleSearchSelection()}</>;
  // return (
  //   <ul>
  //     {options.map((country, i) => (
  //       <li key={i} onClick={() => setSelectedOption(country.id)}>
  //         {country.currencyName}
  //       </li>
  //     ))}
  //   </ul>
  // );
};

export default ShowList;
