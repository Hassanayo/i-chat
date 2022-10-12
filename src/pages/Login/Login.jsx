/* eslint-disable default-case */
import React, { useEffect, useRef, useState } from "react";
import { LoginContainer } from "./login.style";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";

// const MAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{2,24}$/;

export default function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });
  const { email, password, error, loading } = data;
  const userRef = useRef();
  const { login } = useAuth();
  const navigate = useNavigate();

  // focus on the first input tab
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // function that handles the change
  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }
  // function that run when we submit the form
  // signup the user and create a document in firestore that contains user information
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(data);
    if (!email || !password || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    setData({ ...data, error: null, loading: true });

    try {
      const result = await login(email, password);
      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });
      setData({
        ...data,
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      navigate("/messenger");
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
      console.log("error", err);
    }
  }

  return (
    <LoginContainer>
      <section className="form-container">
        <h1 className="header">Log in</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-field">
            <label className="label-name" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              ref={userRef}
              name="email"
              autoComplete="off"
              value={email}
              onChange={handleChange}
            />
          </div>

          <div className="input-field">
            <label className="label-name" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </div>

          {error ? <p>{error}</p> : null}
          <button disabled={loading} className="form-btn">
            {loading ? "Logging in" : "Login"}
          </button>
        </form>
        <p>
          Dont have an account? <Link to="/signup">Sign up</Link>
        </p>
      </section>
    </LoginContainer>
  );
}
