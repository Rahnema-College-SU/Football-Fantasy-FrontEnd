<<<<<<< Updated upstream
import React, {useEffect} from 'react';
import Header from './components/header/Header';
import NavigationBar from './components/navigationBar/NavigationBar';
import {Route, Routes, useNavigate} from "react-router-dom";
import MyTeam from "./components/myTeam/MyTeam";
import Transfer from "./components/transfer/Transfer";
=======
import React from 'react';
import {Header} from './components/header/Header';
import { RemainingMoney } from './components/remainingMoney/RemainingMoney';
import { RemainingPlayer } from './components/remainingPlayer/remainingPlayer';
import MiddleTabBar from './components/middleTabBar/ middleTabBar';
import ChoosePlayer from './components/choosePlayer/choosePlayer';
import DateBox from './components/dateBox/dateBox';
import SignInForm  from './components/signIn/signInForm';
import Form from './components/items/Form';
import SignUpForm from './components/signUp/signUpForm';
import SignUpConfirm from './components/signUpConfirm/signUpConfirm';
>>>>>>> Stashed changes

function App() {
    const navigate = useNavigate()

    //TODO: do not change url when refresh page
    useEffect(() => {
        navigate('/my-team')
    }, [])

    return (
        <div>
<<<<<<< Updated upstream
            <Header/>
            <NavigationBar/>

            <Routes>
                <Route path={'/my-team'} element={<MyTeam/>}/>
                <Route path={'/transfers'} element={<Transfer/>}/>
            </Routes>
=======
        {/* <Form /> */}
        {/* <SignInForm></SignInForm> */}
        {/* <SignUpForm /> */}
        <SignUpConfirm />
        
>>>>>>> Stashed changes
        </div>
    );
}

export default App;
