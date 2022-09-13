import React from "react";
import "./SignInForm.css";
import Form from "../items/Form";
import {useNavigate} from "react-router-dom";
import {homeTabsEndingUrl, showingMyTeamTabsEndingUrl} from "../../global/Variables";


function SignInForm() {
    const navigate = useNavigate()

    return (
        <Form>

            <div className="sign-in-form">
                <div className="header">
                    <hr className="line"/>
                    <div className="header-text">ورود به فانتزی</div>
                    <hr className="line"/>
                </div>

                <div className="signInInputBar">
                    <span className="label">نام کاربری</span>
                    <input className="input" type="text"/>
                    <span className="label">رمز عبور</span>
                    <input className="input" type="text"/>
                </div>

                <div className="button-bar">
                    <button className="sign-in-button"
                            onClick={() => navigate(`/home/${homeTabsEndingUrl.myTeam}/${showingMyTeamTabsEndingUrl.schematic}`)}>ورود
                    </button>
                    <button className="sign-in-button">ثبت نام</button>
                </div>
            </div>
        </Form>
    );
}

export default SignInForm;
