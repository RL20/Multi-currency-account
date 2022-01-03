// export default App;

// import "./AccountCrud.css";
import React, { useState, useEffect } from "react";
import accountRoot from "./accountRoot";

function AccountCrud() {
  const [data, setData] = useState(null);
  const [users, setUsers] = useState(null);
  const [user, setUser] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const id = 2;
  useEffect(() => {
    const getUsers = async () => {
      setErrorMsg("");
      // setIsLoading(true);
      try {
        let { data } = await accountRoot.get("account");
        setUsers(data);
      } catch (e) {
        setErrorMsg(e.message);
      }
      // setIsLoading(false);
    };
    getUsers();
    const fetchUsertData = async () => {
      const { data } = await accountRoot.get(`account/${id}`);
      setUser(data);
    };
    fetchUsertData();
  }, []);
  // useEffect(() => {
  //   const getUsers = async () => {
  //     setErrorMsg("");
  //     setIsLoading(true);
  //     try {
  //       let { data } = await accountRoot.get("account");
  //       setUsers(data);
  //     } catch (e) {
  //       setErrorMsg(e.message);
  //     }
  //     setIsLoading(false);
  //   };
  //   getUsers();
  // }, []);

  //!----------------

  // useEffect(() => {
  //   const fetchUsertData = async () => {
  //     const { data } = await accountRoot.get(`account/${id}`);
  //     setUser(data);
  //   };
  //   fetchUsertData();
  //   return () => {};
  // }, []);
  //!----------------
  const updateUser = async (id, obj) => {
    try {
      const { data } = await accountRoot.put(`account/${id}`, obj);
      let newUsers = [...users];
      const tempUsers = newUsers.map((e) => {
        console.log(e.id === id);
        if (e.id === id) {
          return data;
        }
        return e;
      });
      console.log(tempUsers);

      // const updatedUser = newUsers.find((usr) => usr.id === id);
      // updatedUser.name = obj.name;
      // updatedUser.amount = obj.amount;
      // updatedUser.balance = obj.balance;
      // updatedUser.currency = obj.currency;
      // updatedUser.email = obj.email;
      // updatedUser.token = obj.token;
      setUsers(tempUsers);
    } catch (e) {
      setErrorMsg(e.message);
      console.dir(e);
    }
  };
  //!----------------
  const creatUser = async (obj) => {
    try {
      let { data } = await accountRoot.post(`account`, obj);
      let newUsers = [...users];
      newUsers.push(data);
      setUsers(newUsers);
    } catch (e) {
      setErrorMsg(e.message);
    }
  };
  //!----------------
  const deleteUser = async (id) => {
    try {
      await accountRoot.delete(`account/${id}`);
      let users2 = users.filter((user) => user.id !== id);
      setUsers(users2);
    } catch (e) {
      setErrorMsg(e.message);
    }
  };
  // creatUser({
  //   amount: 10,
  //   balance: "600000",
  //   currency: "$",
  //   email: "b@a.com",
  //   name: "Harel Harel",
  //   token: "token 45",
  // });
  // updateUser(2, { ...user, amount: 50000000 });
  // users && deleteUser(4);

  // user && console.log("from apii", user);
  // users && console.log("from apii222", users);
  return (
    <div>
      <button onClick={() => updateUser(2, { name: "Harel", amount: 800000, balance: 92, currency: "currency 2", email: "email 2", id: 2, token: "token 2" })}>update</button>
    </div>
  );
}

export default AccountCrud;
