import React, {useRef} from "react";
import "./SignInForm.css";
import Form from "../items/Form";
import {useNavigate} from "react-router-dom";
import {homeTabsEndingUrl} from "../../global/Variables";
import {axiosSignIn} from "../../global/ApiCalls";
import {invalidInputError, onAxiosError, onAxiosSuccess} from "../../global/Errors";
import {getShowingMyTeamTabsStateName, setToken} from "../../global/Storages";
import {focusOnElementByRef, handleKeyboardEvent} from "../../global/Functions";

function SignInForm() {
    const navigate = useNavigate()
    const passwordInputRef = useRef<HTMLDivElement | null>(null)

    const signInInput = {
        username: "",
        password: ""
    }

    function signInApiCall() {
        if (signInInput.password.length < 6) {
            return alert("رمز عبوری با حدّاقل ۶ کاراکتر وارد کنید")
        } else {
            axiosSignIn(signInInput.username, signInInput.password).then(
                res => {
                    onAxiosSuccess({
                        res: res, myError: invalidInputError, onSuccess: () => {
                            navigate(`/home/${homeTabsEndingUrl.myTeam}/${getShowingMyTeamTabsStateName()}`)
                            setToken(res.data.data.access_token)
                        }
                    })

                },
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
                    <input className="input" type="password" onChange={setPassword}
                           ref={focusOnElementByRef(passwordInputRef)} tabIndex={0}
                           onKeyUp={
                               handleKeyboardEvent(['Enter'], [() =>
                                   document.getElementById('sign-in-button-id')?.click()])
                           }/>
                </div>

                <div className="button-bar">
                    <button id={'sign-in-button-id'} className="sign-in-button button"
                            onClick={signInApiCall}>ورود
                    </button>
                    <button className="sign-in-button button" onClick={() => navigate('/sign-up')}>ثبت نام</button>
                </div>
            </div>
        </Form>
    );
}

export default SignInForm;
