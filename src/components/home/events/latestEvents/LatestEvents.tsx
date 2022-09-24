import React from "react";
import "./LatestEvents.css"
import Profile from "./profiles/Profiles";

export function LatestEvents() {
    return (
        <div className="Latest-Events-Box">
            <div className="Latest-Events-Title"> آخرین رویداد ها</div>
            {/* map to users */}
            <Profile/>
            <Profile/>
        </div>
    )
}

export default LatestEvents