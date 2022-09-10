import Ground from "./ground/Ground";
import React, { useEffect } from "react";
import {RemainingPlayer} from "./remainingPlayer/RemainingPlayer";
import {RemainingMoney} from "./remainingMoney/RemainingMoney";
import MiddleTabBar from "./middleTabBar/MiddleTabBar";
import ChoosePlayer from "./choosePlayer/ChoosePlayer";
import DateBax from "./dateBox/DateBox";
import { useState } from "react";
import http from "../../items/axiosReq"
import axios from "axios";
import ReactDOM from "react-dom";
import { getAllJSDocTags } from "typescript";

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