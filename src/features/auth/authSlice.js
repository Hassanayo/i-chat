import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        user: {
            reducer(state, action){
                
            }
        }
    }
})