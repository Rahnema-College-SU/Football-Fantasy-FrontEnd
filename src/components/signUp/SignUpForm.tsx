import React, {useState} from "react";
import "./SignUpForm.css";
import Form from "../items/Form";
import {useNavigate} from "react-router-dom";
import {axiosSignUp} from "../../global/ApiCalls";
import {addUserError, onAxiosError, onAxiosSuccess, userExistError} from "../../global/Errors";
import {setToken} from "../../global/Storages";
import {countries} from "../../global/Variables";
import {DatePicker} from "react-advance-jalaali-datepicker";

function SignUpForm() {
    const navigate = useNavigate()
    const inputs = ["نام", "نام خانوادگی", "ایمیل", "کشور", "نام کاربری", "رمز عبور"]
    const [currentUser, setCurrentUser] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
        country: "",
        birthDate: ""
    })


    const setField = (key: keyof typeof currentUser): React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> => (e) => {
        setCurrentUser(x => ({...x, [key]: e.target.value}))
    }

    class ChooseDate extends React.Component {
        change(unix: any, formatted: any) {
            console.log(unix); // returns timestamp of the selected value, for example.
            console.log(formatted); // returns the selected value in the format you've entered, forexample, "تاریخ: 1396/02/24 ساعت: 18:30".
            currentUser.birthDate = formatted;
            console.log(currentUser);
        }

        DatePickerInput(props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement>) {
            return <input {...props} />;
        }

        render() {
            return (
                <div className="datePicker">
                    <DatePicker
                        inputComponent={this.DatePickerInput}
                        placeholder="انتخاب تاریخ"
                        format="jYYYY-jMM-jDD"
                        onChange={this.change}
                        id="datePicker"
                        preSelected="----/--/--"

                    />
                </div>
            );
        }
    }

    function signUpApiCall() {
        ///remaining :check if user exist or not
        console.log(currentUser)
        if (currentUser.first_name.length == 0) {
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
        axiosSignUp(currentUser.username, currentUser.password, currentUser.first_name, currentUser.last_name, currentUser.email, currentUser.country, currentUser.birthDate).then(
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
                    <hr className="left-line"/>
                </div>
                <div className="input-bar">
                    <div className="input-container">
                        <span className="label">نام</span>
                        <input className="input" type="text" value={currentUser.first_name}
                               onChange={setField("first_name")}/>
                    </div>
                    <div className="input-container">
                        <span className="label">نام خانوادگی</span>
                        <input className="input" type="text" onChange={setField("last_name")}/>
                    </div>
                    <div className="email-container">
                        <span className="label"> ایمیل</span>
                        <input className="input" type="email" onChange={setField("email")}/>
                    </div>
                    </div>
                    <div className="input-bar">
                    <div className="input-container">
                        <span className="label">کشور</span>
                        <select className="select-country" onChange={setField("country")}>کشور
                            <option value="">انتخاب کشور</option>
                            {countries.map((country) =>
                                <option>{country.flag} {country.text}</option>
                            )}
                        </select>
                    </div>
                    <div className="date-container">
                        <span className="label">تاریخ تولد </span>
                        <ChooseDate/>
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
                <button className="button" id="sign-up-button" type="submit" onClick={() => {
                    signUpApiCall()
                }}>ثبت نام
                </button>
            </div>
        </Form>
    );

}

export default SignUpForm;


