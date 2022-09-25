import React, {useEffect, useState} from 'react';
import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import SignInForm from "./components/signIn/SignInForm";
import SignUpForm from "./components/signUp/SignUpForm";
import SignUpConfirm from "./components/signUpConfirm/SignUpConfirm";
import Home from "./components/home/Home";
import {homeTabsEndingUrl, subTabsEndingUrl} from "./global/Variables";
import {Transfers} from "./components/home/transfers/Transfers";
import MyTeam from "./components/home/myTeam/MyTeam";
import LatestEvents from "./components/home/events/Events";
import Prizes from "./components/home/prizes/Prizes";
import Profile from "./components/home/profile/Profile";
import {
    RemovePlayerModal,
    removePlayerModalDisplayState
} from "./components/home/transfers/removePlayerModal/RemovePlayerModal";
import {useRecoilValue} from "recoil";
import {axiosSignInWithToken} from "./global/ApiCalls";
import {invalidToken, onAxiosError, onAxiosSuccess} from "./global/Errors";
import {setToken} from "./global/Storages";

function App() {
    const removePlayerModalDisplay = useRecoilValue(removePlayerModalDisplayState)
    const navigate = useNavigate()
    const [modalsDivDisplay, setModalsDivDisplay] = useState<'none' | 'block'>('none')

    useEffect(() => {
        if (window.location.href.includes('home'))
            isTokenValid()
                .then(
                    res => res ? '' : navigate('/sign-in'),
                    () => navigate('/sign-in')
                )
        else
            navigate('/sign-in')
    }, [])

    async function isTokenValid(): Promise<boolean> {
        return await axiosSignInWithToken()
            .then(
                res =>
                    onAxiosSuccess({
                        res: res,
                        myError: invalidToken,
                        onSuccess: () => setToken(res.data.data.accessToken),
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

    useEffect(() => {
        if (removePlayerModalDisplay === 'block')
            setModalsDivDisplay('block')
        else
            setModalsDivDisplay('none')
    }, [removePlayerModalDisplay])

    return (
        <div>
            <Routes>
                <Route path="/sign-up" element={<SignUpForm/>}/>
                <Route path="/sign-up-confirm" element={<SignUpConfirm/>}/>
                <Route path="/sign-in" element={<SignInForm/>}/>


                <Route path={`/home/${homeTabsEndingUrl.myTeam}/${subTabsEndingUrl.schematic}`} element={
                    <Home showingTab={<MyTeam subTab={'schematic'}/>}/>
                }/>
                <Route path={`/home/${homeTabsEndingUrl.myTeam}/${subTabsEndingUrl.list}`} element={
                    <Home showingTab={<MyTeam subTab={'list'}/>}/>
                }/>
                <Route path={`/home/${homeTabsEndingUrl.transfers}/${subTabsEndingUrl.schematic}`} element={
                    <Home showingTab={<Transfers subTab={'schematic'}/>}/>
                }/>
                <Route path={`/home/${homeTabsEndingUrl.transfers}/${subTabsEndingUrl.list}`} element={
                    <Home showingTab={<Transfers subTab={'list'}/>}/>
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
