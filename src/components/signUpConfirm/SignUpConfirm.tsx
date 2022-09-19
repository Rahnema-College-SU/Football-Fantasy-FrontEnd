import React from "react";
import "./SignUpConfirm.css";
import Form from "../items/Form";
import {useNavigate} from "react-router-dom";
import {getToken} from "../../global/Variables";
import {axiosSignUpConfirm} from "../../global/ApiCalls";
import {invalidCodeError, onAxiosError, onAxiosSuccess} from "../../global/Errors";


function SignUpConfirm() {
    const navigate = useNavigate()
    const setCode: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        code = e.target.value
    }
    var code = ''

    function ConfirmApi() {

        axiosSignUpConfirm(getToken(), code).then(
            res => {
                console.log(getToken())
                onAxiosSuccess({
                    res: res, myError: invalidCodeError, onSuccess: () => {
                        navigate('/sign-in')
                    }
                })
            }
            ,
            error =>
                onAxiosError({axiosError: error, myError: invalidCodeError})
        )
    }

    return (
        <Form>

            <div className="sign-up-confirm">
                <div className="header">
                    <hr className="line"/>
                    <div className="header-text">تایید ثبت نام</div>
                    <hr className="line"/>
                </div>
                <div className="container">
                    <text className="label">لطفا کدی که به ایمیلتان ارسال شده را در کادر زیر وارد کنید</text>
                    <input className="input" onChange={setCode}/>
                    <button className="button" onClick={ConfirmApi}>تایید ثبت نام</button>
                </div>
            </div>
        </Form>
    );
}

export default SignUpConfirm;
