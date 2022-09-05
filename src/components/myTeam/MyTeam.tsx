import Ground from "./ground/Ground";
import React from "react";
import {RemainingPlayer} from "./remainingPlayer/remainingPlayer";
import {RemainingMoney} from "./remainingMoney/RemainingMoney";
import MiddleTabBar from "./middleTabBar/ middleTabBar";
import ChoosePlayer from "./choosePlayer/choosePlayer";
import DateBax from "./dateBox/dateBox";

function MyTeam() {
    return (
        <div>
            <RemainingPlayer/>
            <RemainingMoney/>
            <MiddleTabBar/>
            <ChoosePlayer/>
            <DateBax/>
            <Ground />
        </div>
    )
}

export default MyTeam