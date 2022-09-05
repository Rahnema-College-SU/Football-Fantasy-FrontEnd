import React from "react";
import { Component } from "react";
import "./signInForm.css";
import cover from "./assets/cover.svg";
import logo from "./assets/logo.svg";
import Form from "../items/Form";


class SignInForm extends Component {
  render() {
    return (
      <Form>
          <div className="SignInForm">
            <div className="header">
              <hr id="line" />
              <div id="headerText">ورود به فانتزی</div>
              <hr id="line" />
            </div>
            <label htmlFor="username">نام کاربری</label>
            <input id="username" type="text" />
            <label htmlFor="password">رمز عبور</label>
            <input id="password" type="text" />
            <div id="buttonBar">
              <button className="signInButton">ورود</button>
              <button className="signUpButton">ثبت نام</button>
            </div>
          </div>
      </Form>
    );
  }
}
export default SignInForm;
