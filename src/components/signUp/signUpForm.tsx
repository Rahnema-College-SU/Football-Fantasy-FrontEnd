import React from "react";
import { Component } from "react";
import "./signUpForm.css";
import Form from "../items/Form";


class SignUpForm extends Component {
  render() {
    return (
      <Form>
          <div className="signUpForm">
            <div className="header">
              <hr id="line" />
              <div id="headerText">فرم ثبت نام</div>
              <hr id="line" />
            </div>
            <table>
              <tr>
            <th>
            <label htmlFor="username">نام</label>
            <input id="username" type="text" />
            </th>
                <th>
                <label htmlFor="password"> نام خانوادگی</label>
            <input id="password" type="text" />
                </th>
              </tr>
              <tr>
            <th>
            <label htmlFor="username">ایمیل</label>
            <input id="username" type="text" />
            </th>
                <th>
                <label htmlFor="password">کشور</label>
            <input id="password" type="text" />
                </th>
              </tr>
              <tr>
            <th>
            <label htmlFor="username">نام کاربری</label>
            <input id="username" type="text" />
            </th>
                <th>
                <label htmlFor="password"> رمز عبور</label>
            <input id="password" type="text" />
                </th>
              </tr>
            </table>
            <button>ثبت نام</button>
          </div>
      </Form>
    );
  }
}
export default SignUpForm;
