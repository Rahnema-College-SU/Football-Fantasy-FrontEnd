import React, { useEffect, useState } from "react";
import Friends from "./friends/Friends";
import LatestEvents from "./latestEvents/LatestEvents";
import {MainSearchBox} from "./mainSearchBox/MainSearchBox";
import './Events.css'
import { profileModalDisplayState} from "./profileModal/profileModal";
import {atom, useRecoilValue, useSetRecoilState, SetRecoilState ,useRecoilState} from "recoil";

function Events() {
    const ProfileModalDisplay = useSetRecoilState(profileModalDisplayState)

    return (

        <div className="events-main-div">
            <MainSearchBox/>
            <div className="events-items-div">
                <Friends/>
                <LatestEvents/>

            </div>

        </div>
    )
}

export default Events