/* eslint-disable default-case */
import React, { useEffect, useRef, useState } from "react";
import { SignupContainer } from "./signup.style";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";

// const MAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{2,24}$/;

export default function Signup() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirm_pwd: "",
    error: null,
    loading: false,
  });
  const { name, email, password, confirm_pwd, error, loading } = data;
  const userRef = useRef();
  const { signup} = useAuth();
  const navigate = useNavigate()

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
    if (!name || !email || !password || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    setData({ ...data, error: null, loading: true });

    try {
      const result = await signup(email, password);
      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });
      setData({ ...data, loading: false });
      navigate("/login")
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
      console.log("error", err);
    }
  }

  return (
    <SignupContainer>
      {/* {state.success ? (
        <section>
          <h1>Success</h1>
          <p><a href="/">Sign In</a></p>
        </section>
      ) : ( */}
      <section className="form-container">
        <h1 className="header">Sign up</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-field">
            <label className="label-name" htmlFor="name">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              ref={userRef}
              autoComplete="off"
              value={name}
              onChange={handleChange}
            />
          </div>

          <div className="input-field">
            <label className="label-name" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
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

          <div className="input-field">
            <label className="label-name" htmlFor="confirm_pwd">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirm_pwd"
              name="confirm_pwd"
              value={confirm_pwd}
              onChange={handleChange}
            />
          </div>
          {error ? <p>{error}</p> : null}
          <button disabled={loading} className="form-btn">
            Sign Up
          </button>
        </form>
        <p>
          Dont have an account? <Link to="/login">Login</Link>
        </p>
      </section>
      {/* )} */}
    </SignupContainer>
  );
}
