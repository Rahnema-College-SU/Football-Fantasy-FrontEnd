import React from "react";
import Friends from "./friends/Friends";
import LatestEvents from "./latestEvents/LatestEvents";
import {MainSearchBox} from "./mainSearchBox/MainSearchBox";
import './Events.css'
import {profileModalDisplayState} from "./profileModal/profileModal";
import {useSetRecoilState} from "recoil";


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