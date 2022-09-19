import React from "react";
import "./SignInForm.css";
import Form from "../items/Form";
import {useNavigate} from "react-router-dom";
import {getToken, homeTabsEndingUrl, setToken, showingMyTeamTabsEndingUrl} from "../../global/Variables";
import {axiosSignIn} from "../../global/ApiCalls";
import {invalidInputError, onAxiosError, onAxiosSuccess} from "../../global/Errors";

function SignInForm() {
    const navigate = useNavigate()

    class Input {
        username = ""
        password = ""
    }

    var signInInput = new Input

    function signInApiCall() {
        setToken('')
        if (signInInput.password.length != 8) {
            return alert("رمز عبوری با ۸ کاراکتر وارد کنید")
        } else {
            axiosSignIn(signInInput.username, signInInput.password).then(
                res => {
                    onAxiosSuccess({
                        res: res, myError: invalidInputError, onSuccess: () => {
                            navigate(`/home/${homeTabsEndingUrl.myTeam}/${showingMyTeamTabsEndingUrl.schematic}`)
                            setToken(res.data.data.access_token)
                        }
                    })
                    
                }
                ,
                error => {
                    onAxiosError({axiosError: error, myError: invalidInputError})
                }
            )
        }
    }

    const setUsername: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        signInInput.username = e.target.value
    }
    const setPassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        signInInput.password = e.target.value
    }

    return (
        <Form>

            <div className="sign-in-form">
                <div className="header">
                    <hr className="line"/>
                    <div className="header-text">ورود به فانتزی</div>
                    <hr className="line"/>
                </div>

                <div className="sign-in-input-bar">
                    <span className="label">نام کاربری</span>
                    <input className="input" type="text" onChange={setUsername}/>
                    <span className="label">رمز عبور</span>
                    <input className="input" type="password" onChange={setPassword}/>
                </div>

                <div className="button-bar">
                    <button className="sign-in-button button"
                            onClick={signInApiCall}>ورود
                    </button>
                    <button className="sign-in-button button" onClick={() => navigate('/sign-up')}>ثبت نام</button>
                </div>
            </div>
        </Form>
    );
}

export default SignInForm;
