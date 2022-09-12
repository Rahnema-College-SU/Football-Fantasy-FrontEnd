import React from "react";
import "./SignUpConfirm.css";
import Form from "../items/Form";
import {useNavigate} from "react-router-dom";


function SignUpConfirm() {
    const navigate = useNavigate()

    return (
        <Form>

            <div className="sign-up-confirm">
                <div className="header">
                    <hr className="line"/>
                    <div className="headerText">تایید ثبت نام</div>
                    <hr className="line"/>
                </div>
                <div className="container">
                    <text className="label">لطفا کدی که به ایمیلتان ارسال شده را در کادر زیر وارد کنید</text>
                    <input className="input"/>
                    <button className="button" onClick={() => navigate('/sign-in')}>ثبت نام</button>
                </div>
            </div>
        </Form>
    );
}

export default SignUpConfirm;
