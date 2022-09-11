import React from "react";
import "./SignInForm.css";
import Form from "../items/Form";
import {useNavigate} from "react-router-dom";
import {homeTabsEndingUrl, showingMyTeamTabsEndingUrl} from "../../GlobalVariables";


function SignInForm() {
    const navigate = useNavigate()

    return (
        <Form>

            <div className="signInForm">
                <div className="header">
                    <hr className="line"/>
                    <div className="headerText">ورود به فانتزی</div>
                    <hr className="line"/>
                </div>

                <div className="signInInputBar">
                    <span className="label">نام کاربری</span>
                    <input className="input" type="text"/>
                    <span className="label">رمز عبور</span>
                    <input className="input" type="text"/>
                </div>

                <div className="buttonBar">
                    <button className="signInButton"
                            onClick={() => navigate(`/home/${homeTabsEndingUrl.myTeam}/${showingMyTeamTabsEndingUrl.schematic}`)}>ورود
                    </button>
                    <button className="signInButton">ثبت نام</button>
                </div>
            </div>
        </Form>
    );
}

export default SignInForm;
