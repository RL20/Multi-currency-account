import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth, signInWithEmailAndPassword, signInWithGoogle } from "../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import "../styles/Login.css";
// import Spinner from "../../components/Spinner/Spinner";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    // console.log('login user: ', user);
    if (user) {
      console.log(user);
      history.push("/");
    }
    //TODO:  if user is logged in - update login context and redirect to landing page
  }, [user, history]);

  if (loading) {
    return (
      <div className="login">
        {/* <Spinner /> */}
        loading...
      </div>
    );
  }

  return (
    <div className="login">
      <div className="login__container">
        <input type="text" className="login__textBox" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-mail Address" />
        <input type="password" className="login__textBox" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button className="login__btn" onClick={() => signInWithEmailAndPassword(email, password)}>
          Login
        </button>
        <button className="login__btn login__google" onClick={signInWithGoogle}>
          Login with Google
        </button>
        {/* 
        <div className="login__btn login__facebook" onClick={signInWithFacebook}>
          <img src={fb_login} alt="fb_login" />
          Login with Facebook
        </div> */}
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link> now.
        </div>
      </div>
    </div>
  );
}

export default Login;
