import React from "react";
import Friends from "./friends/Friends";
import LatestEvents from "./latestEvents/LatestEvents";
import {MainSearchBox} from "./mainSearchBox/MainSearchBox";
import './Events.css'

function Events() {
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