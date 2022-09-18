import React, {useEffect, useState} from 'react';
import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import SignInForm from "./components/signIn/SignInForm";
import SignUpForm from "./components/signUp/SignUpForm";
import SignUpConfirm from "./components/signUpConfirm/SignUpConfirm";
import Home from "./components/home/Home";
import {homeTabsEndingUrl, showingMyTeamTabsEndingUrl} from "./global/Variables";
import {MyTeam} from "./components/home/myTeam/MyTeam";
import Transfers from "./components/home/transfers/Transfers";
import LatestEvents from "./components/home/events/Events";
import Prizes from "./components/home/prizes/Prizes";
import Profile from "./components/home/profile/Profile";
import {
    RemovePlayerModal,
    removePlayerModalDisplayState
} from "./components/home/myTeam/removePlayerModal/RemovePlayerModal";
import {useRecoilValue} from "recoil";

function App() {
    const removePlayerModalDisplay = useRecoilValue(removePlayerModalDisplayState)
    const navigate = useNavigate()
    const [modalsDivDisplay, setModalsDivDisplay] = useState<'none' | 'block'>('none')

    useEffect(() => {
        navigate('/sign-in')
    }, [])

    useEffect(() => {
        if (removePlayerModalDisplay === 'block') {
            setModalsDivDisplay('block')
        } else {
            setModalsDivDisplay('none')
        }
    }, [removePlayerModalDisplay])

    return (
        <div>
            <Routes>
                <Route path="/sign-up" element={<SignUpForm/>}/>
                <Route path="/sign-up-confirm" element={<SignUpConfirm/>}/>
                <Route path="/sign-in" element={<SignInForm/>}/>


                <Route path={`/home/${homeTabsEndingUrl.myTeam}/${showingMyTeamTabsEndingUrl.schematic}`} element={
                    <Home showingTab={<MyTeam showingTab={'schematic'}/>}/>
                }/>
                <Route path={`/home/${homeTabsEndingUrl.myTeam}/${showingMyTeamTabsEndingUrl.list}`} element={
                    <Home showingTab={<MyTeam showingTab={'list'}/>}/>
                }/>
                <Route path={`/home/${homeTabsEndingUrl.transfers}`} element={
                    <Home showingTab={<Transfers/>}/>
                }/>
                <Route path={`/home/${homeTabsEndingUrl.Events}`} element={
                    <Home showingTab={<LatestEvents/>}/>
                }/>
                <Route path={`/home/${homeTabsEndingUrl.profile}`} element={
                    <Home showingTab={<Profile/>}/>
                }/>
                <Route path={`/home/${homeTabsEndingUrl.prizes}`} element={
                    <Home showingTab={<Prizes/>}/>
                }/>
            </Routes>

            <div id={'modals-div'} style={{display: modalsDivDisplay}}>
                <RemovePlayerModal/>
            </div>
        </div>
    );
}

export default App;
