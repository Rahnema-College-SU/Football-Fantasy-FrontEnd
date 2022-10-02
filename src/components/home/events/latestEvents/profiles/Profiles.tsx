import React, { useState } from "react";
import "./Profiles.css"
import star from './assets/star.svg'
import addIcon from './assets/addIcon.svg'
import removeIcon from './assets/removeIcon.svg'
import like from './assets/heart.svg'
import liked from './assets/heart-1.svg'
import profilePhoto from './assets/profilePhoto.jpeg'
import {useSetRecoilState} from "recoil";
import {profileModalDisplayState} from "../../profileModal/profileModal";
import { latestEventType } from "../../../../../global/Types";
import { toFarsiNumber } from "../../../../../global/functions/Converters";
import { axiosUserInfo } from "../../../../../global/ApiCalls";

export function Profile(currentEvent:latestEventType) {
    const ProfileModalDisplay = useSetRecoilState(profileModalDisplayState)
    const [likePhotoPath,setLikePhotoPath] =useState<string>(like)

    return (
        <div className="profile-box">
            <div className="show-week">{currentEvent.weekName}</div>
            <div className="data-box">
                <div className="score-part">
                    <div className="score-title">امتیاز هفته</div>
                    <div className="show-score-box">
                        <img className="star" src={star} alt="star for showing score"></img>
                        <div className="score">{toFarsiNumber(currentEvent.teamPoints)}</div>
                    </div>
                </div>
                <div className="changes-title" hidden={currentEvent.substitutions.length==0}>تعویض ها</div>
                <div >
                    {currentEvent.substitutions.map(s=><div className="changes">
                     <img src={addIcon} alt="added players Icon"></img>
                    <div className="change-spot">{s.playerInId}</div>
                    <img src={removeIcon} alt="removed players Icon"></img>
                    <div className="change-spot">{s.playerOutId}</div>
                     </div>
                    )}
                </div>
            </div>
            <div className="profile-info" onClick={() => {
               // axiosUserInfo(currentEvent.userId)
//                currentEventForModal(currentEvent)
                ProfileModalDisplay('block')
            }}>
                <img className="profile-photo" src={profilePhoto} alt="profile photo"></img>
                <div className="name">{currentEvent.firstName} {currentEvent.lastName}</div>
                <img className="like" src={likePhotoPath} alt="like" onClick={()=>setLikePhotoPath(liked)}></img>
            </div>
        </div>
    )
}

export default Profile