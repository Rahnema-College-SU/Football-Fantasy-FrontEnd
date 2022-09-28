import React from "react";
import "./Friends.css"
import searchIcon from "../mainSearchBox/assets/searchicon.png"
import profilePhoto from '../latestEvents/profiles/assets/profilePhoto.jpeg'



export function Friends() {
    return (
        <div className="main-box">
            <text className="title"> دوستان شما</text>
            <div className="friends-box">
                <div className="button-bar">
                    <button className="selected-button">
                        دنبال کنندگان
                    </button>
                    <button className="following-button">
                    <div className="button-text">دنبال شوندگان</div>
                    </button>
                </div>
                <div className={'search-box'}>
                <img className="search-icon" src={searchIcon} alt={'magnifier'}/>
                <input className={'search-input'} placeholder={'جستجو'}/>
                </div>
                <div className="profiles-box">
                    <div className="profile">
                        <img className="friends-profile-photo" src={profilePhoto} alt="profile photo"></img>
                        <div className="friends-name">first and last name</div>
                        <button className="see-profile">
                        <div className="button-text"> مشاهده</div>
                        </button>
                    </div>
                    <div className="profile">
                        <img className="friends-profile-photo" src={profilePhoto} alt="profile photo"></img>
                        <div className="friends-name">first and last name</div>
                        <button className="follow-back">
                        <div className="button-text"> دنبال کردن</div>
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Friends