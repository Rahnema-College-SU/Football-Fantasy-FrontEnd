import React from "react";
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

function SignInForm() {
    const navigate = useNavigate()

    const signInInput = {
        username: "",
        password: ""
    }

    function handleSignIn() {
        if (signInInput.username.length === 0) {
            return alert("نام کاربری را وارد کنید")
        } else if (signInInput.password.length === 0) {
            return alert("رمز عبور را وارد کنید")
        } else {
            axiosSignIn(signInInput.username, signInInput.password).then(
                res => {
                    onAxiosSuccess({
                        res: res, onSuccess: () => {
                            const homeTabsStateName = getHomeTabsStateName()

                            navigate(`/home/${getHomeTabsStateName()}/${homeTabsStateName === homeTabsEndingUrl.myTeam ?
                                getMyTeamSubTabsStateName() : homeTabsStateName === homeTabsEndingUrl.transfers ?
                                    getTransfersSubTabsStateName() : ''}`)
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
        <Form onSubmit={handleSignIn}>

            <div className="sign-in-form">
                <div className="header">
                    <hr className="line"/>
                    <div className="header-text">ورود به فانتزی</div>
                    <hr className="left-line"/>
                </div>

                <div className="sign-in-input-bar">
                    <span className="label">نام کاربری</span>
                    <input className="input" type="text" onChange={setUsername}/>
                    <span className="label">رمز عبور</span>
                    <input className="input" type="password" onChange={setPassword}/>
                </div>

                <div className="button-bar">
                    <button id={'sign-in-button-id'} className="sign-in-button button" type="submit"
                    >ورود
                    </button>
                    <button className="sign-in-button button" onClick={() => navigate('/sign-up')}>ثبت نام</button>
                </div>
            </div>
        </Form>
    );
}

export default SignInForm;
