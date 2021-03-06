import React, { useState, useEffect } from "react";
import { getUser } from "../api/accountApi";
import "../styles/UserInfo.css";
function UserInfo({ id }) {
  // const show = useRef(false);
  const [user, setUser] = useState("");
  const [show, setShow] = useState([]);
  useEffect(() => {
    const userFromApi = async () => {
      const us = await getUser(id);
      setUser(us);
      setShow(Array(us.history.length).fill(false));
    };
    userFromApi();
    return () => {};
  }, [id]);
  const userInfo = user && `Multy Blance is ${user.balance.toFixed(2)} ${user.currencyName} `;
  const userFee =
    user &&
    `Personal Fee : ${user.fee}% from the transaction 
   Withdraw Fee :0.01% 
    Deposit Fee : free`;
  const style = (index) => {
    console.log(`show`, show);
    const newShow = show.map((e) => false); //init to false
    newShow[index] = !show[index];
    setShow(newShow);
  };
  const history = () => {
    return (
      <div className="user-info">
        <table className="styled-table">
          <thead>
            <tr>
              <td> Convert From </td>
              <td> Conver To </td>
              <td> Fee Charged </td>
              <td> Rate </td>
              <td> Date </td>
            </tr>
          </thead>
          <tbody>
            {user.history.length !== 0 &&
              user.history.map((line, i) => {
                return (
                  <tr className={show[i] ? "active-row" : ""} key={i} onClick={() => style(i)}>
                    <td> {line.fromCurrency}</td>
                    <td> {line.to}</td>
                    <td> {line.fee}</td>
                    <td> {line.rate}</td>
                    <td> {line.operationTime}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  };

  // <tr>
  //   <td>Dom</td>
  //   <td>6000</td>
  // </tr>
  // <tr className="active-row">
  //   <td>Melissa</td>
  //   <td>5150</td>
  // </tr>

  return (
    <div className="user-info">
      <div>{user && <h2>{userInfo}</h2>}</div>
      <div>{user && <h3>{userFee}</h3>}</div>
      <div>{user && history()}</div>
    </div>
  );
}

export default UserInfo;
