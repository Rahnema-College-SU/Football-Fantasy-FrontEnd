import React from "react";
import "./Friends.css"


export function Friends() {
    return (
        // <div className="mainBox">
        //     <text className="title"> دوستان شما</text>
        // </div>
        <div className="main-box">
            <text className="title"> دوستان شما</text>
            <div className="friends-box">
                <div className="button-bar">
                    <button className="selected-button">دنبال شوندگان</button>
                    <button className="following-button">دنبال کنندگان</button>
                </div>
            </div>
        </div>
    )
}

export default Friends