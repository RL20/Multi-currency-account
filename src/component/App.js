//clo rfce
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UserInfo from "./UserInfo";
import Header from "./Header";

import Account from "./Account";
import "../styles/App.css";
import Rates from "./Rates";
import NotFound from "./NotFound";
import Homepage from "./Homepage";
import Login from "./Login";
import Register from "./Register";
// import Login from "./Login";
// import Login from "./Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Homepage} />
          <Route path="/rates" exact component={Rates} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          {/* <Route path="/reset" exact component={Reset} /> */}
          {/* <Route path="/info" exact component={UserInfo} /> */}
          <Route path="/info" exact>
            <UserInfo id={1} />
          </Route>
          <Route path="/wallet" exact>
            <Account id={1} />
          </Route>
          {/* <Route path="/wallet" exact component={Account} /> */}
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
  // return (
  //   <div className="App">
  //     {/* <Login /> */}
  //     <Header />
  //     <Rates />
  //     <UserInfo id={1} />
  //     <Account id={1} rate={2} />
  //   </div>
  // );
}

export default App;
