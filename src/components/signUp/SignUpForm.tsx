import React, {useRef} from "react";
import "./SignUpForm.css";
import Form from "../items/Form";
import {useNavigate} from "react-router-dom";
import {axiosSignUp} from "../../global/ApiCalls";
import {addUserError, onAxiosError, onAxiosSuccess, userExistError} from "../../global/Errors";
import {setToken} from "../../global/Storages";
import {focusOnElementByRef, handleKeyboardEvent} from "../../global/Functions";

function SignUpForm() {
    const navigate = useNavigate()
    const passwordInputRef = useRef<HTMLDivElement | null>(null)

    const currentUser = {
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        country: ""
    }

    const setUsername: React.ChangeEventHandler<HTMLInputElement> = (e) => (
        currentUser.username = e.target.value
    )
    const setName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        currentUser.first_name = e.target.value
    }
    const setLastName: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        currentUser.last_name = e.target.value
    }
    const setEmail: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        currentUser.email = e.target.value
    }
    const setCountry: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
        currentUser.country = e.target.value
    };
    const setPassword: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        currentUser.password = e.target.value
    }

    function signUpApiCall() {
        ///remaining :check if user exist or not
        if (currentUser.first_name.length === 0) {
            return alert("نام خود را وارد کنید")
        } else if (currentUser.last_name.length === 0) {
            return alert("نام خانوادگی خود را وارد کنید")
        } else if (!/\S+@\S+\.\S+/.test(currentUser.email)) {
            return alert("ایمیل معتبر وارد کنید")
        } else if (currentUser.country.length === 0) {
            return alert("کشور را انتخاب کنید")
        } else if (currentUser.username.length === 0) {
            return alert("نام کاربری را وارد کنید")
        } else if (currentUser.password.length !== 6) {
            return alert("رمز عبوری با ۶ کاراکتر وارد کنید")
        }
        axiosSignUp(currentUser.username, currentUser.password, currentUser.first_name, currentUser.last_name, currentUser.email, currentUser.country).then(
            res => {
                onAxiosSuccess({
                    res: res, myError: addUserError, onSuccess: () => {
                        navigate('/sign-up-confirm')
                        setToken(res.data.data.access_token)
                    }

                })

            }
            ,
            error => {
                if (error.error_message === 'UserName is already taken!') {
                    onAxiosError({axiosError: error, myError: userExistError})
                } else {
                    onAxiosError({axiosError: error, myError: addUserError})
                }
            }
        )

    }

    return (
        <Form>
            <div className="sign-up-form">
                <div className="header">
                    <hr className="line"/>
                    <div className="header-text">فرم ثبت نام</div>
                    <hr className="line"/>
                </div>
                <div className="input-bar">
                    <div className="input-container">
                        <span className="label">نام</span>
                        <input className="input" type="text" onChange={setName}/>
                    </div>
                    <div className="input-container">
                        <span className="label">نام خانوادگی</span>
                        <input className="input" type="text" onChange={setLastName}/>
                    </div>
                    <div className="input-container">
                        <span className="label"> ایمیل</span>
                        <input className="input" type="text" onChange={setEmail}/>
                    </div>
                    <div className="input-container">
                        <span className="label">کشور</span>
                        <select className="select-country" onChange={setCountry}>کشور
                            <option value="">انتخاب کشور</option>
                            <option value="iran">iran</option>
                            <option value="us">us</option>
                            <option value="uk">uk</option>
                        </select>
                    </div>
                    <div className="input-container">
                        <span className="label">نام کاربری</span>
                        <input className="input" type="text" onChange={setUsername}/>
                    </div>
                    <div className="input-container">
                        <span className="label">رمز عبور</span>
                        <input className="input" type="password" onChange={setPassword}
                               ref={focusOnElementByRef(passwordInputRef)} tabIndex={0}
                               onKeyUp={
                                   handleKeyboardEvent(['Enter'], [() =>
                                       document.getElementById('sign-up-button')?.click()])
                               }/>
                    </div>
                </div>
                <button className="button" id="sign-up-button" onClick={signUpApiCall}>ثبت نام</button>
            </div>
        </Form>
    );

}

export default SignUpForm;
