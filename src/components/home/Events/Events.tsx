import React from "react";
import Friends from "./friends/friends";
import LatestEvents from "./latestEvents/latestEvents";
import {MainSearchBox} from "./mainSearchBox/mainSearchBox";
import './Events.css'

function Events() {
    return (
        
        <div className="events-main-div">
            <MainSearchBox />
            <div className="events-items-div">
                <Friends />
                <LatestEvents />
                
            </div>

        </div>
    )
}

export default Events