import styled from "styled-components";

export const SignupContainer = styled.div`
  font-family: "Poppins";
  
  max-width: 700px;
  .form-container {
    padding: 50px;

    border-radius: 2px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .label-name {
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 35px;
    letter-spacing: 0.08em;
  }
  .header {
    font-style: normal;
    font-weight: 900;
    font-size: 34px;
    line-height: 35px;
    padding-bottom: 30px;
    letter-spacing: 0.08em;
  }
  .input-field {
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
  }

  input[type="text"],
  input[type="email"],
  input[type="password"],
  button,
  textarea {
    border: 1px solid #f3f3f3;
    font-weight: 500;
    font-size: 14px;
    line-height: 35px;
    letter-spacing: 0.08em;
    color: #000;
    width: 100%;
  }
  button{
    background-color: var(--darkGreen);
    color: #fff;
    cursor: pointer;
    border-radius: 8px;
  }
  button:disabled{
    background-color: gray;
    opacity: 0.7;
    cursor: not-allowed;
  }
  button:focus{
    outline: none;
    border: 1px solid gray;
  }


  .instructions {
    font-size: 0.75rem;
    border-radius: 0.5rem;
    color: #fff;
    padding: 0.25rem;
    position: relative;
    bottom: -10px;
    color: red;
  }

  .instructions > svg {
    margin-right: 0.25rem;
  }

  .offscreen {
    position: absolute;
    left: -9999px;
  }

  .hide {
    display: none;
  }

  .valid {
    color: limegreen;
    margin-left: 0.25rem;
  }

  .invalid {
    color: red;
    margin-left: 0.25rem;
  }

  .errmsg {
    background-color: lightpink;
    color: firebrick;
    font-weight: bold;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .line {
    display: inline-block;
  }
  .link{
    color: #000;
  }
`;
