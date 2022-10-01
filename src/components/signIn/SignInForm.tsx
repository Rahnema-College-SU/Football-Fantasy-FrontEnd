import React, {useEffect, useRef} from "react";
import "./SignInForm.css";
import Form from "../items/Form";
import {useNavigate} from "react-router-dom";
import {homeTabsEndingUrl} from "../../global/Variables";
import {axiosSignIn} from "../../global/ApiCalls";
import {onAxiosError, onAxiosSuccess} from "../../global/Errors";
import {
    getHomeTabsStateName,
    getMyTeamSubTabsStateName,
    getTransfersSubTabsStateName,
    setToken
} from "../../global/Storages";
import {focusOnElementByRef, handleKeyboardEvent} from "../../global/functions/General";
import {closeSnackbar} from "notistack";

function SignInForm() {
    const navigate = useNavigate()
    const passwordInputRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => closeSnackbar(), [])

    const signInInput = {
        username: "",
        password: ""
    }

    function signInApiCall() {
        if (signInInput.username.length === 0) {
            return alert("نام کاربری را وارد کنید")
        } else if (signInInput.password.length === 0) {
            return alert("رمز عبور را وارد کنید")
        } else {
            axiosSignIn(signInInput.username, signInInput.password).then(
                res => {
                    onAxiosSuccess({
                        res: res, onSuccess: () => {
                            navigate(`/home/${getHomeTabsStateName()}/${getHomeTabsStateName() === homeTabsEndingUrl.myTeam ?
                                getMyTeamSubTabsStateName() : getTransfersSubTabsStateName()}`)
                            setToken(res.data.data.accessToken)
                        }
                    })

                },
                error => {
                    onAxiosError({axiosError: error})
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
