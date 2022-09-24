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
import {axiosFantasyTeam} from "./global/ApiCalls";
import {invalidToken, onAxiosError, onAxiosSuccess} from "./global/Errors";
import { ProfileModal, profileModalDisplayState } from './components/home/events/profileModal/profileModal';

function App() {
    const removePlayerModalDisplay = useRecoilValue(removePlayerModalDisplayState)
    const profileModalDisplay=useRecoilValue(profileModalDisplayState)
    const navigate = useNavigate()
    //const [modalsDivDisplay, setModalsDivDisplay] = useState<'none' | 'block'>('none')

    useEffect(() => {
        // if (window.location.href.includes('home'))
        //     isTokenValid()
        //         .then(
        //             res => res ? '' : navigate('/sign-in'),
        //             () => navigate('/sign-in')
        //         )
        // else
        //     navigate('/sign-in')
         navigate(`/home/${homeTabsEndingUrl.Events}`)
    }, [])

    async function isTokenValid(): Promise<boolean> {
        return await axiosFantasyTeam()
            .then(
                res =>
                    onAxiosSuccess({
                        res: res,
                        myError: invalidToken,
                        onErrorReturnValue: false,
                        onSuccessReturnValue: true
                    }),
                err =>
                    onAxiosError({
                        axiosError: err,
                        myError: invalidToken,
                        onErrorReturnValue: false
                    })
            )
    }

    // useEffect(() => {
    //     if (removePlayerModalDisplay === 'block')
    //         setModalsDivDisplay('block')
    //     else
    //         setModalsDivDisplay('none')
    // }, [removePlayerModalDisplay])

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

            <div id={'modals-div'} style={{display: removePlayerModalDisplay}}>
                <RemovePlayerModal/>
            </div>
            <div id={'modals-div'} style={{display: profileModalDisplay}}>
                <ProfileModal/>
            </div>
        </div>
    );
}

export default App;
