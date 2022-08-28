/* eslint-disable default-case */
import React, { useEffect, useRef, useReducer, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import { SignupContainer } from "./signup.style";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

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
  matchPwd: "",
  validMatch: false,
  matchFocus: false,
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
    case "matchPwd":
      return { ...state, matchPwd: action.payload };
    case "validMatch":
      return { ...state, validMatch: action.payload };
    case "matchFocus":
      return { ...state, matchFocus: action.payload };
    case "errMsg":
      return { ...state, errMsg: action.payload };
    case "success":
      return { ...state, success: action.payload };
    default:
      throw new Error("an error occured");
  }
};
export default function Signup() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [err, setErr] = useState("")
  const userRef = useRef();
  const errRef = useRef();

  const {signup, currentUser} = useAuth()
  // focus on the first input tab
  useEffect(() => {
    userRef.current.focus();
  }, []);
  // check if username is valid with the regexp
  useEffect(() => {
    const result = MAIL_REGEX.test(state.user);
    dispatch({ type: ACTION.VALID_NAME, payload: result });
  }, [state.user]);
  //check if password is valid with regexp and compare with comfirmPassword
  useEffect(() => {
    const result = PWD_REGEX.test(state.pwd);
    dispatch({ type: ACTION.VALID_PWD, payload: result });
    const match = state.pwd === state.matchPwd;
    dispatch({ type: ACTION.VALID_MATCH, payload: match });
  }, [state.pwd, state.matchPwd]);

  // clear error when all input fields are correctly filled
  useEffect(() => {
    dispatch({ type: ACTION.ERR_MSG, payload: "" });
  }, [state.user, state.pwd, state.matchPwd]);

  // function that run when we submit the form
  async function handleSubmit(e) {
    e.preventDefault();
    const v1 = MAIL_REGEX.test(state.user);
    const v2 = PWD_REGEX.test(state.pwd);
    if (!v1 || !v2) {
      dispatch({ type: ACTION.ERR_MSG, payload: "Invalid Entry" });
      return;
    }
    dispatch({ type: ACTION.SUCCESS, payload: true });

    // send signup to firebase
    console.log("submitted");
    try {
      await signup(state.user, state.pwd)
    } catch (error) {
      console.log("error", e);
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
      <div>{currentUser && currentUser.email}</div>
        <section className="form-container">
        <p ref={errRef} aria-live="assertive" className={state.errMsg}>
          {state.errMsg ? "errmsg" : ""}
        </p>
        <h1 className="header">Sign up</h1>
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
              <span className={state.validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span
                className={state.validPwd || !state.pwd ? "hide" : "invalid"}
              >
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) =>
                dispatch({ type: ACTION.PWD, payload: e.target.value })
              }
              required
              aria-invalid={state.validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() =>
                dispatch({ type: ACTION.PWD_FOCUS, payload: true })
              }
              onBlur={() =>
                dispatch({ type: ACTION.PWD_FOCUS, payload: false })
              }
            />
            <p
              id="pwdnote"
              className={
                state.pwdFocus && !state.validPwd ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include upper and lowercase letters, a number and a special
              character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percentage">%</span>
            </p>
          </div>

          <div className="input-field">
            <label className="label-name" htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={
                  state.validMatch && state.matchPwd ? "valid" : "hide"
                }
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={
                  state.validMatch || !state.matchPwd ? "hide" : "invalid"
                }
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) =>
                dispatch({ type: ACTION.MATCH_PWD, payload: e.target.value })
              }
              value={state.matchPwd}
              required
              aria-invalid={state.validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() =>
                dispatch({ type: ACTION.MATCH_FOCUS, payload: true })
              }
              onBlur={() =>
                dispatch({ type: ACTION.MATCH_FOCUS, payload: false })
              }
            />
            <p
              id="confirmnote"
              className={
                state.matchFocus && !state.validMatch
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>
          </div>

          <button
          className="form-btn"
            disabled={
              !state.validName || !state.validMatch || !state.validPwd
                ? true
                : false
            }
          >
            Sign Up
          </button>
        </form>
        <p >Dont have an account? <Link  to="/login">Login</Link></p>
      </section>
      {/* )} */}
    </SignupContainer>
  );
}
