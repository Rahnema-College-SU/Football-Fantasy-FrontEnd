import React, {useEffect} from 'react';
import Header from './components/header/Header';
import NavigationBar from './components/navigationBar/NavigationBar';
import {Route, Routes, useNavigate} from "react-router-dom";
import MyTeam from "./components/myTeam/MyTeam";
import Transfer from "./components/transfer/Transfer";

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
