import React, {useEffect} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import SignInForm from "./components/signIn/signInForm";
import SignUpForm from "./components/signUp/signUpForm";
import SignUpConfirm from "./components/signUpConfirm/signUpConfirm";
import Home from "./components/home/Home";
import {homeTabsEndingUrl, getPascalCase} from "./GlobalVariables";
import MyTeam from "./components/home/myTeam/MyTeam";
import Transfers from "./components/home/transfers/Transfers";
import LatestEvents from "./components/home/latestEvents/LatestEvents";
import Prizes from "./components/home/prizes/Prizes";
import Profile from "./components/home/profile/Profile";

function App() {
    const navigate = useNavigate()
    const htmlTags = [
        homeTabsEndingUrl.myTeam: <MyTeam/>,

    ]

    useEffect(() => {
        // navigate('/sign-up')
        navigate('/home/my-team')
    }, [])

    return (
        <div>
            <Routes>
                <Route path="/sign-up" element={<SignUpForm/>}/>
                <Route path="/sign-up-confirm" element={<SignUpConfirm/>}/>
                <Route path="/sign-in" element={<SignInForm/>}/>


                <Route path={`/home/${homeTabsEndingUrl.myTeam}`} element={
                    <Home showingTab={<MyTeam/>}/>
                }/>
                <Route path={`/home/${homeTabsEndingUrl.transfers}`} element={
                    <Home showingTab={<Transfers/>}/>
                }/>
                <Route path={`/home/${homeTabsEndingUrl.latestEvents}`} element={
                    <Home showingTab={<LatestEvents/>}/>
                }/>
                <Route path={`/home/${homeTabsEndingUrl.profile}`} element={
                    <Home showingTab={<Profile/>}/>
                }/>
                <Route path={`/home/${homeTabsEndingUrl.prizes}`} element={
                    <Home showingTab={<Prizes/>}/>
                }/>
            </Routes>
        </div>
    );
}

export default App;
