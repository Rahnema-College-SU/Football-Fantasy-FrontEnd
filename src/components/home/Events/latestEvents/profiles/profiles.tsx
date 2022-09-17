import React from "react";
import "./profiles.css"
import star from './star.svg'


export function Profile() {
    return (
        <div className="profile-box">
            <div className="data-box">
                <div className="show-score-box">
                <img src={star}></img>
                </div>
                <div className="show-week">#هفته دو</div>
                
            </div>
            <text className="Latest-Events-Title">‍‍‍بروفایل</text>

        </div>
    )
}

export default Profile