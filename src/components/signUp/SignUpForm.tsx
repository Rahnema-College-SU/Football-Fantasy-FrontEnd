import React from "react";
import "./SignUpForm.css";
import Form from "../items/Form";
import {useNavigate} from "react-router-dom";

function SignUpForm() {
    const navigate = useNavigate()
    const inputs=["نام","نام.خانوادگی","ایمیل","کشور","نام کاربری","رمز عبور"]

    return (
        <Form>
            <div className="signUpForm">
                <div className="header">
                    <hr className="line"/>
                    <div className="headerText">فرم ثبت نام</div>
                    <hr className="line"/>
                </div>
                <div className="inputBar">
                    {inputs.map(i =>(<div className="inputContainer">
                    <span className="label">{i}</span>
                    <input className="input" type="text"/>
                    </div>))}
                </div>
                <button className="button" onClick={() => navigate('/sign-up-confirm')}>ثبت نام</button>
            </div>
        </Form>
    );

}

export default SignUpForm;