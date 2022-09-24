import React from "react";
import "./Profiles.css"
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
                    <div className="score-title">امتیاز هفته</div>
                    <div className="show-score-box">
                        <img className="star" src={star} alt="star for showing score"></img>
                        <div className="score">۱۰۸</div>
                    </div>
                </div>
                <div className="changes-title">تعویض ها</div>
                <div className="changes">
                    <img src={addIcon} alt="added players Icon"></img>
                    <div className="change-spot">yasin</div>
                    <img src={removeIcon} alt="removed players Icon"></img>
                    <div className="change-spot">Haland</div>
                </div>


            </div>
            <div className="profile-info">
                <img className="profile-photo" src={profilePhoto} alt="profile photo"></img>
                <div className="name">first and last name</div>
                ‍‍‍
                <img className="like" src={like} alt="click to like profile"></img>
            </div>
        </div>
    )
}

export default Profile