import React from "react";
import "./Friends.css"


export function Friends() {
    return (
        // <div className="mainBox">
        //     <div className="title"> دوستان شما</div>
        // </div>
        <div className="main-box">
            <div className="title"> دوستان شما</div>
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