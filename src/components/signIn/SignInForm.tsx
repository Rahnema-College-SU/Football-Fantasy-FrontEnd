import React from "react";
import "./SignInForm.css";
import Form from "../items/Form";
import {useNavigate} from "react-router-dom";


function SignInForm() {
    const navigate = useNavigate()

    return (
        <Form>
            <div className="SignInForm">
                <div className="header">
                    <hr id="line"/>
                    <div id="headerText">ورود به فانتزی</div>
                    <hr id="line"/>
                </div>
                <label htmlFor="username">نام کاربری</label>
                <input id="username" type="text"/>
                <label htmlFor="password">رمز عبور</label>
                <input id="password" type="text"/>
                <div id="buttonBar">
                    <button className="signInButton" onClick={() => navigate('/home/my-team')}>ورود</button>
                    <button className="signUpButton">ثبت نام</button>
                </div>
            </div>
        </Form>
    );
}

export default SignInForm;
