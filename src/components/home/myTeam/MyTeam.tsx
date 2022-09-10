import Ground from "./ground/Ground";
import React from "react";
import {RemainingPlayer} from "./remainingPlayer/RemainingPlayer";
import {RemainingMoney} from "./remainingMoney/RemainingMoney";
import MiddleTabBar from "./middleTabBar/MiddleTabBar";
import ChoosePlayer from "./choosePlayer/ChoosePlayer";
import DateBax from "./dateBox/DateBox";

function MyTeam() {
    return (
        <div>
            <RemainingPlayer/>
            <RemainingMoney/>
            <MiddleTabBar/>
            <ChoosePlayer/>
            <DateBax/>
            <Ground/>
        </div>
    )
}

export default MyTeam