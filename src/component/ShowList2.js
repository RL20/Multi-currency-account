import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";

const ShowList = ({ options, getSelected }) => {
  console.log(`show`);
  const [selectedOption, setSelectedOption] = useState("");
  // const [selectedOption, setSelectedOption] = useState(options[0] ? options[0].value : "");
  // const [selectedOption, setSelectedOption] = useState(options[0].value);
  console.log(`selected`, selectedOption);
  useEffect(() => {
    getSelected(selectedOption);
  }, [getSelected, selectedOption]);
  return (
    <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
      <option value="" disabled>
        select your currency
      </option>
      {options.map((country, i) => (
        <option key={i} value={country.id}>
          {country.currencyName}
        </option>
      ))}
    </select>
  );
  // return (
  //   <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
  //     {options.length &&
  //       options.map((country, i) => (
  //         <option key={i} value={country.id}>
  //           {country.currencyName}
  //         </option>
  //       ))}
  //   </select>
  // );

  //!
  // return (
  //   <div>
  //     <select>
  //       {item.map((country, i) => (
  //         <option key={i} value={item.id}>
  //           {country.currencyName}
  //         </option>
  //       ))}
  //     </select>
  //   </div>
  // );
  //!
};

export default ShowList;
