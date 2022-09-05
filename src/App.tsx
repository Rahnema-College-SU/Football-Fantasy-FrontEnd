import React, {useEffect} from 'react';
import Header from './components/header/Header';
import NavigationBar from './components/navigationBar/NavigationBar';
import {Route, Routes, useNavigate} from "react-router-dom";
import MyTeam from "./components/myTeam/MyTeam";
import Transfer from "./components/transfer/Transfer";

import {Header} from './components/header/Header';
import { RemainingMoney } from './components/remainingMoney/RemainingMoney';
import { RemainingPlayer } from './components/remainingPlayer/remainingPlayer';
import MiddleTabBar from './components/middleTabBar/ middleTabBar';
import ChoosePlayer from './components/choosePlayer/choosePlayer';
import DateBox from './components/dateBox/dateBox';

function App() {
    const navigate = useNavigate()

    //TODO: do not change url when refresh page
    useEffect(() => {
        navigate('/my-team')
    }, [])

    return (
        <div>
            <Header/>
            <NavigationBar/>

            <Routes>
                <Route path={'/my-team'} element={<MyTeam/>}/>
                <Route path={'/transfers'} element={<Transfer/>}/>
            </Routes>
        </div>
    );
}

export default App;
