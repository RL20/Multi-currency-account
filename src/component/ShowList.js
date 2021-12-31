import React from "react";

const ShowList = ({ item }) => {
  console.log(`show`);
  return (
    <select>
      {item.map((country, i) => (
        <option key={i}>{country.currencyName}</option>
      ))}
    </select>
  );
};

export default ShowList;
