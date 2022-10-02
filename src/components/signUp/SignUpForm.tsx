import React, {useRef, useState} from "react";
import "./SignUpForm.css";
import Form from "../items/Form";
import {useNavigate} from "react-router-dom";
import { axiosSignUp } from "../../global/ApiCalls";
import {addUserError, onAxiosError, onAxiosSuccess, userExistError} from "../../global/Errors";
import {setToken} from "../../global/Storages";
import {focusOnElementByRef, handleKeyboardEvent} from "../../global/functions/General";

function SignUpForm() {
    const navigate = useNavigate()
    const passwordInputRef = useRef<HTMLDivElement | null>(null)

    const [currentUser, setCurrentUser] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        country: ""
    })

    const setField = (key: keyof typeof currentUser):React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> => (e) => {
        setCurrentUser( x => ({...x, [key]: e.target.value}))
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
        } else if (currentUser.password.length < 8) {
            return alert("رمز عبوری با حداقل ۸ کاراکتر وارد کنید")
        }
        const {username, first_name: firstName, password, last_name: lastName, email, country} = currentUser;
        axiosSignUp({username, firstName, lastName,email,country, password}).then(
            res => {
                onAxiosSuccess({
                    res: res, onSuccess: () => {
                        navigate('/sign-up-confirm')
                        setToken(res.data.data.accessToken)
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
        <Form onSubmit={signUpApiCall}>
            <div className="sign-up-form">
                <div className="header">
                    <hr className="line"/>
                    <div className="header-text">فرم ثبت نام</div>
                    <hr className="line"/>
                </div>
                <div className="input-bar">
                    <div className="input-container">
                        <span className="label">نام</span>
                        <input className="input" type="text" value={currentUser.first_name} onChange={setField("first_name")}/>
                    </div>
                    <div className="input-container">
                        <span className="label">نام خانوادگی</span>
                        <input className="input" type="text" onChange={setField("last_name")}/>
                    </div>
                    <div className="input-container">
                        <span className="label"> ایمیل</span>
                        <input className="input" type="text" onChange={setField("email")}/>
                    </div>
                    <div className="input-container">
                        <span className="label">کشور</span>
                        <select className="select-country" onChange={setField("country")}>کشور
                            <option value="">انتخاب کشور</option>
                            <option value="iran">iran</option>
                            <option value="us">us</option>
                            <option value="uk">uk</option>
                        </select>
                    </div>
                    <div className="input-container">
                        <span className="label">نام کاربری</span>
                        <input className="input" type="text" onChange={setField("username")}/>
                    </div>
                    <div className="input-container">
                        <span className="label">رمز عبور</span>
                        <input className="input" type="password" onChange={setField("password")}
                            //    ref={focusOnElementByRef(passwordInputRef)} tabIndex={0}
                            />
                    </div>
                </div>
                <button className="button" id="sign-up-button" type="submit" onClick={()=>{signUpApiCall()}}>ثبت نام</button>
            </div>
        </Form>
    );

}

export default SignUpForm;
