import React, { useState, useEffect } from "react";
import axios from "axios";

import accountRoot from "../api/accountRoot";

// function Account({ name, amount, balance, currency, email, token, id }) {
function Account({ id }) {
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchUsertData = async () => {
      const { data } = await accountRoot.get(`account/${id}`);
      console.log("data", data);
      setUser(data);
    };
    fetchUsertData();
    return () => {};
  }, []);

  // return <div>{<h1>your Blance is {user.balance} </h1>}</div>;

  return <div>{user && <h1>your Blance is {Number(user.balance) / 2}</h1>}</div>;
}

export default Account;
