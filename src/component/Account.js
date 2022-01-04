import React, { useState, useEffect } from "react";
import { Dropdown } from "semantic-ui-react";
import { getRate, getCurrencies } from "../api/currencyApi";
import { updateUser } from "../api/accountApi";
import Inputs from "./Inputs";
import { getUser } from "../api/accountApi";
import ConvertionList from "./ConvertionList";

function Account({ id, rate }) {
  const [user, setUser] = useState("");
  const [currency, setCurrency] = useState("");
  const [searchField, setSearchField] = useState("");
  const [curencyID, setCurencyID] = useState("");
  const [ratePairs, setRatePairs] = useState("");
  const [show, setShow] = useState(true);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const userFromApi = async () => {
      const us = await getUser(id);
      setUser(us);
    };
    userFromApi();
    return () => {};
  }, [id]);

  useEffect(() => {
    if (!user) return;
    if (convertTosameCurrency) {
      setMessage("you can't convert to same currency");
      return;
    }
    setMessage("");
    const currenciesFromApi = async () => {
      const rate = await getRate(`${user.currencyName}_${curencyID}`);
      setRatePairs(rate);
    };
    setShow(true);
    currenciesFromApi();
    return () => {};
  }, [curencyID]);

  const handelInput = (input) => {
    setSearchField(input);
  };
  const getCurencyId = (childDta) => {
    setCurencyID(childDta);
  };

  const fee = (fee, money) => {
    return (fee / 100) * money;
  };
  const total = (fee, money) => {
    return money - fee;
  };
  const insert = async (balance, currencyName) => {
    if (convertTosameCurrency) {
      return;
    }
    const historyObg = { fromCurrency: `${user.balance} ${user.currencyName}`, to: `${balance} ${currencyName}`, fee: userFee, rate: ratePairs, operationTime: new Date() };
    const newHistory = [...user.history, historyObg];
    const obj = { balance: parseFloat(balance), currencyName: `${currencyName}`, history: newHistory };
    const newUser = await updateUser(id, obj);
    setUser(newUser);
    setShow(false);
  };
  const toShow = () => {
    setShow(!show);
  };
  const userInfo = user && `Multy Blance is ${user.balance.toFixed(2)} ${user.currencyName} `;

  const userRate = (user.balance * ratePairs).toFixed(2);
  const userFee = fee(user.fee, user.balance * ratePairs).toFixed(2);
  const userTotal = total(userFee, user.balance * ratePairs).toFixed(2);
  const convertTosameCurrency = user.currencyName === curencyID;

  // const countryOptions = [
  //   { key: "af", value: "af", flag: "af", text: "Afghanistan" },
  //   { key: "ax", value: "ax", flag: "ax", text: "Aland Islands" },
  //   { key: "al", value: "al", flag: "al", text: "Albania" },
  // ];

  // const DropdownExampleSearchSelection = () => <Dropdown placeholder="Select Country" fluid search selection options={countryOptions} />;

  return (
    <div>
      <div>{user && <h1>{userInfo}</h1>}</div>
      {/* <div class="currency-flag currency-flag-usd"></div> */}
      <div className="convert">
        <ConvertionList parentCallBack={getCurencyId} placeholder="Search Currency" />
        <h3>{message}</h3>
        <h3>{user && curencyID && show && !convertTosameCurrency && `Rate  : ${userRate} ${curencyID}`}</h3>
        <h3>{user && curencyID && show && !convertTosameCurrency && `Fee   : ${userFee} ${curencyID}`}</h3>
        <h3>{user && curencyID && show && !convertTosameCurrency && `Total : ${userTotal} ${curencyID}`}</h3>

        <button
          onClick={() => {
            insert(userTotal, `${curencyID}`);
          }}
        >
          Confirm convartion
        </button>
      </div>
    </div>
  );
}

export default Account;
