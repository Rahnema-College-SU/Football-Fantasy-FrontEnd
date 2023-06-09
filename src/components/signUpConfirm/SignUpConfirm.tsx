import React, {useRef} from "react";
import "./SignUpConfirm.css";
import Form from "../items/Form";
import {useNavigate} from "react-router-dom";
import {axiosSignUpConfirm} from "../../global/ApiCalls";
import {addUserError, onAxiosError, onAxiosSuccess, onMyError} from "../../global/Errors";
import {getToken} from "../../global/Storages";
import {focusOnElementByRef, handleKeyboardEvent} from "../../global/functions/General";


function SignUpConfirm() {
    let code = '';
    const navigate = useNavigate()
    const confirmationCodeInputRef = useRef<HTMLDivElement | null>(null)

    const setCode: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        code = e.target.value
    }

    function ConfirmApi() {
        const token = getToken()
        if (!token) {
            onMyError({myError: addUserError})
            return
        }
        axiosSignUpConfirm(token, code).then(
            res => {
                onAxiosSuccess({
                    res: res, onSuccess: () => navigate('/sign-in')
                })
            },
            error =>
                onAxiosError({axiosError: error})
        )
    }

    return (
        <Form onSubmit={ConfirmApi}>

            <div className="sign-up-confirm">
                <div className="header">
                    <hr className="line"/>
                    <div className="header-text">تایید ثبت نام</div>
                    <hr className="left-line"/>
                </div>
                <div className="container">
                    <div className="label">لطفا کدی که به ایمیلتان ارسال شده را در کادر زیر وارد کنید</div>
                    <input className="input" onChange={setCode} ref={focusOnElementByRef(confirmationCodeInputRef)}
                           tabIndex={0} onKeyUp={
                        handleKeyboardEvent(['Enter'], [() =>
                            document.getElementById('confirmation-code-button')?.click()])
                    }/>
                    <button id={'confirmation-code-button'} className="button" onClick={ConfirmApi}>تایید ثبت نام
                    </button>
                </div>
            </div>
        </Form>
    );
}

export default SignUpConfirm;
