import React, {useState} from "react";
import "./SignUpForm.css";
import Form from "../items/Form";
import {useNavigate} from "react-router-dom";
import {axiosSignUp} from "../../global/ApiCalls";
import {
    addUserError,
    emptyCountryError,
    emptyEmailError,
    emptyFamilyNameError,
    emptyNameError,
    emptyUsernameError,
    onAxiosError,
    onAxiosSuccess,
    onMyError,
    userExistError
} from "../../global/Errors";
import {setToken} from "../../global/Storages";
import {countries} from "../../global/Variables";
import {DatePicker} from "react-advance-jalaali-datepicker";

function SignUpForm() {
    const navigate = useNavigate()
    const [d, setD] = useState("----/--/--")
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
            setD(formatted);
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
                        preSelected={d}

                    />
                </div>
            );
        }
    }

    function signUpApiCall() {
        if (currentUser.first_name.length == 0) {
            onMyError({myError: emptyNameError})
            return
        } else if (currentUser.last_name.length === 0) {
            onMyError({myError: emptyFamilyNameError})
            return
        } else if (!/\S+@\S+\.\S+/.test(currentUser.email)) {
            onMyError({myError: emptyEmailError})
            return
        } else if (currentUser.country.length === 0) {
            onMyError({myError: emptyCountryError})
            return
        } else if (currentUser.username.length === 0) {
            onMyError({myError: emptyUsernameError})
            return
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
                        <div className="label">نام</div>
                        <input className="input" type={'text'} value={currentUser.first_name}
                               onChange={setField("first_name")}/>
                    </div>
                    <div className="input-container">
                        <div className="label">نام خانوادگی</div>
                        <input className="input" type={'text'} onChange={setField("last_name")}/>
                    </div>
                    <div className="email-container">
                        <div className="label"> ایمیل</div>
                        <input className="input" type={'text'} onChange={setField("email")}/>
                    </div>
                </div>
                <div className="input-bar">
                    <div className="input-container">
                        <div className="label">کشور</div>
                        <select className="select-country" onChange={setField("country")}>کشور
                            <option value="">انتخاب کشور</option>
                            {countries.map((country) =>
                                <option value={country.text}>{country.flag} {country.text}</option>
                            )}
                        </select>
                    </div>
                    <div className="date-container">
                        <span className="label">تاریخ تولد </span>
                        <ChooseDate/>
                    </div>
                    <div className="input-container">
                        <div className="label">نام کاربری</div>
                        <input className="input" type={'text'} onChange={setField("username")}/>
                    </div>
                    <div className="input-container">
                        <div className="label">رمز عبور</div>
                        <input className="input" onChange={setField("password")}/>
                    </div>
                </div>
                <button className="button" id="sign-up-button" type="submit">
                    ثبت نام
                </button>
            </div>
        </Form>
    );

}

export default SignUpForm;


