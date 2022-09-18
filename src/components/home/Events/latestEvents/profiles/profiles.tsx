import React from "react";
import "./profiles.css"
import star from './assets/star.svg'
import addIcon from './assets/addIcon.svg'
import removeIcon from './assets/removeIcon.svg'
import like from './assets/heart.svg'
import profilePhoto from './assets/profilePhoto.jpeg'

export function Profile() {
    return (
        <div className="profile-box">
            <div className="show-week">#هفته دو</div>
            <div className="data-box">
                <div className="score-part">
                    <text className="score-title">امتیاز هفته</text>
                <div className="show-score-box">
                <img className="star" src={star}></img>
                <text className="score">۱۰۸</text>
                </div>
                </div>                
                <text className="changes-title">تعویض ها</text>
                <div className="changes">
                    <img src={addIcon}></img>
                    <div className="change-spot">yasin</div>
                    <img src={removeIcon}></img>
                    <text className="change-spot">Haland</text>
                </div>
                
                
            </div>
            <div className="profile-info">
                <img className="profile-photo" src={profilePhoto} ></img>
                <div className="name">first and last name</div>‍‍‍
                <img className="like" src={like}></img>
            </div>
        </div>
    )
}

export default Profile