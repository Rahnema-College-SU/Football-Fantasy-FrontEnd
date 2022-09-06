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
                    <hr className="line"/>
                    <div className="headerText">ورود به فانتزی</div>
                    <hr className="line"/>
                </div>
                <div className="inputBar">
                    <span className="label">نام کاربری</span>
                    <input className="input" type="text"/>
                    <span className="label">رمز عبور</span>
                    <input className="input" type="text"/>
                </div>
                <text className="label">نام کاربری</text>
                <input className="input" type="text"/>
                <label className="label">رمز عبور</label>
                <input className="input" type="text"/>
                <div className="buttonBar">
                    <button className="button" onClick={() => navigate('/home/my-team')}>ورود</button>
                    <button className="button">ثبت نام</button>
                </div>
            </div>
        </Form>
    );
}

export default SignInForm;
