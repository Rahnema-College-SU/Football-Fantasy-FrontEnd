import React, {useEffect,lazy} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {homeTabsEndingUrl} from "./GlobalVariables";
import SignInForm from "./components/signIn/SignInForm";
import SignUpForm from "./components/signUp/SignUpForm";
import SignUpConfirm from "./components/signUpConfirm/SignUpConfirm";
import Home from "./components/home/Home";


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
