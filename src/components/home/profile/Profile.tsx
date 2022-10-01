import React from "react";
import "./Profile.css";

function Profile() {
    return (
        <div className="profile-main-div">
            <div className="upload-photo">
                upload photo
                <input type="text"/>
            </div>
            <div className="profile-button-bar">
                <button className="profile-button">
                    خروج از حساب کاربری
                </button>
                <button className="profile-button"> حذف حساب کاربری</button>
            </div>
        </div>
    )
}

export default Profile