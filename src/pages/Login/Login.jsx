/* eslint-disable default-case */
import { LoginContainer } from "./login.style";
import React, { useEffect, useRef, useReducer, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCheck,faInfoCircle,faTimes,} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const MAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{2,24}$/;
// reducer
const ACTION = {
  USER: "user",
  VALID_NAME: "validName",
  USER_FOCUS: "userFocus",
  PWD: "pwd",
  VALID_PWD: "validPwd",
  PWD_FOCUS: "pwdFocus",
  MATCH_PWD: "matchPwd",
  VALID_MATCH: "validMatch",
  MATCH_FOCUS: "matchFocus",
  ERR_MSG: "errMsg",
  SUCCESS: "success",
};
const initialState = {
  user: "",
  validName: false,
  userFocus: false,
  pwd: "",
  validPwd: false,
  pwdFocus: false,
  errMsg: "",
  success: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "user":
      return { ...state, user: action.payload };
    case "validName":
      return { ...state, validName: action.payload };
    case "userFocus":
      return { ...state, userFocus: action.payload };
    case "pwd":
      return { ...state, pwd: action.payload };
    case "validPwd":
      return { ...state, validPwd: action.payload };
    case "pwdFocus":
      return { ...state, pwdFocus: action.payload };
    case "errMsg":
      return { ...state, errMsg: action.payload };
    case "success":
      return { ...state, success: action.payload };
    default:
      throw new Error("an error occured");
  }
};
export default function Login() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const userRef = useRef();
  const navigate = useNavigate()


  const { login, currentUser } = useAuth();
  // focus on the first input tab
  useEffect(() => {
    userRef.current.focus();
    console.log(currentUser)
  }, [currentUser]);
  // check if username is valid with the regexp
  useEffect(() => {
    const result = MAIL_REGEX.test(state.user);
    dispatch({ type: ACTION.VALID_NAME, payload: result });
  }, [state.user]);
  //check if password is valid with regexp and compare with comfirmPassword
  useEffect(() => {
    const result = PWD_REGEX.test(state.pwd);
    dispatch({ type: ACTION.VALID_PWD, payload: result });
  }, [state.pwd]);



  // clear error when all input fields are correctly filled
  useEffect(() => {
    dispatch({ type: ACTION.ERR_MSG, payload: "" });
  }, [state.user, state.pwd, state.matchPwd]);

  // function that run when we submit the form
  async function handleSubmit(e) {
    e.preventDefault();

    // send signup to firebase
    console.log("submitted");
    try {
      setError("")
      setLoading(true)
      await login(state.user, state.pwd);
      navigate('/messenger')
    } catch (error) {
      console.log("error", e);
      setError("Failed to sign in")
      
    }
    setLoading(false)
  }
  return (
    <LoginContainer>
      <section className="form-container">
        <h1 className="header">Log In</h1>
        <div className="error-box">
        <p>{error}</p>
        </div>
        <form className="form" onSubmit={handleSubmit}>
        <div className="input-field">
            <label className="label-name" htmlFor="email">
              Email:
              <span className={state.validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={state.validName || !state.user ? "hide" : "invalid"}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="email"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) =>
                dispatch({ type: ACTION.USER, payload: e.target.value })
              }
              required
              aria-invalid={state.validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() =>
                dispatch({ type: ACTION.USER_FOCUS, payload: true })
              }
              onBlur={() =>
                dispatch({ type: ACTION.USER_FOCUS, payload: false })
              }
            />
            <p
              id="uidnote"
              className={
                state.userFocus && state.user && !state.validName
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Invalid email
              <br />
              Must include @
              <br />
            </p>
          </div>

          <div className="input-field">
            <label className="label-name" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) =>
                dispatch({ type: ACTION.PWD, payload: e.target.value })
              }
              required
            />
          </div>

          <button disabled={loading} className="form-btn">Log in</button>
        </form>
        <p>
          Dont have an account? <Link to="/signup">Sign up</Link>
        </p>
      </section>
    </LoginContainer>
  );
}
