import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import SignInForm from "./components/signIn/signInForm";
import SignUpForm from "./components/signUp/signUpForm";
import SignUpConfirm from "./components/signUpConfirm/signUpConfirm";
import Home from "./components/home/Home";
import {homeTabsEndingUrl} from "./GlobalVariables";

function App() {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/sign-up')
    }, [])

    function getHomePageRouts() {
        return Object.values(homeTabsEndingUrl).map(tabEndingUrl => (
            <Route path={`/home/${tabEndingUrl}`} element={<Home/>}/>
        ))
    }

    return (
        <div>
            <Routes>
                <Route path="/sign-up" element={<SignUpForm/>}/>
                <Route path="/sign-up-confirm" element={<SignUpConfirm/>}/>
                <Route path="/sign-in" element={<SignInForm/>}/>

                {getHomePageRouts()}
            </Routes>
        </div>
    );
}

export default App;
