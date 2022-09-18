import React from "react";
import "./latestEvents.css"
import Profile from "./profiles/profiles";

export function LatestEvents() {
    return (
        <div className="Latest-Events-Box">
            <text className="Latest-Events-Title"> آخرین رویداد ها</text>
            {/* map to users */}
            <Profile />
            <Profile />
        </div>
    )
}

export default LatestEvents