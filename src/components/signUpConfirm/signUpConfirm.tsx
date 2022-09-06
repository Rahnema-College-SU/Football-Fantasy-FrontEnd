import React from "react";
import "./signUpConfirm.css";
import Form from "../items/Form";
import {useNavigate} from "react-router-dom";


function SignUpConfirm() {
    const navigate = useNavigate()

    return (
        <Form>
            <div className="signUpConfirm">
                <div className="header">
                    <hr id="line"/>
                    <div id="headerText">تایید ثبت نام</div>
                    <hr id="line"/>
                </div>
                <div id="Container">
                    <label htmlFor="username">لطفا کدی که به ایمیلتان ارسال شده را در کادر زیر وارد کنید</label>
                    <input id="username" type="text"/>
                    <button onClick={() => navigate('/sign-in')}>ثبت نام</button>
                </div>
            </div>
        </Form>
    );
}

export default SignUpConfirm;
