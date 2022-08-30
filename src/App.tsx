import React from 'react';

import {Header} from './components/header/Header';
import { RemainingMoney } from './components/remainingMoney/RemainingMoney';
import { RemainingPlayer } from './components/remainingPlayer/remainingPlayer';
import MiddleTabBar from './components/middleTabBar/ middleTabBar';
import ChoosePlayer from './components/choosePlayer/choosePlayer';
import DateBox from './components/dateBox/dateBox';

function App() {
    return (
        <div>
            <Header />
            <RemainingPlayer />
            <RemainingMoney />
            <MiddleTabBar />
            <ChoosePlayer />
            <DateBox/>
            
        </div>
    );

}

export default App;
