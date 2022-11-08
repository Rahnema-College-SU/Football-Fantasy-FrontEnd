import React from "react";
import "./Profiles.css"
import star from './assets/star.svg'
import addIcon from './assets/addIcon.svg'
import removeIcon from './assets/removeIcon.svg'
import like from './assets/heart.svg'
import liked from './assets/heart-1.svg'
import profilePhoto from './assets/profilePhoto.jpeg'
import {useSetRecoilState} from "recoil";
import {profileModalDisplayState} from "../../profileModal/profileModal";
import {latestEventType} from "../../../../../global/Types";
import {toFarsiNumber} from "../../../../../global/functions/Converters";
import {axiosLike, axiosUnlike} from "../../../../../global/ApiCalls";
import {onAxiosError, onAxiosSuccess, onInfo, onS} from "../../../../../global/Errors";

export function EventItem({event}: { event: latestEventType }) {
    const ProfileModalDisplay = useSetRecoilState(profileModalDisplayState)

    function handleLike(id: string) {
        axiosLike(id).then(
            res => {
                onAxiosSuccess({
                    res: res, myError: "invalidInputError", onSuccess: () => {
                        onS("‍پسندیده شد")
                        ProfileModalDisplay('none')
                    }
                })

            },
            error => {
                onAxiosError({axiosError: error, myError: "invalidInputError"})
            }
        )
    }

    function handleUnLike(id: string) {
        axiosUnlike(id).then(
            res => {
                onAxiosSuccess({
                    res: res, myError: "invalidInputError", onSuccess: () => {
                        onInfo("‍دیگر پ‍سندیده نخواهد بود")
                    }
                })

            },
            error => {
                onAxiosError({axiosError: error, myError: "invalidInputError"})
            }
        )
    }

    return (
        <div className="profile-box">
            <div className="show-week">{event.weekName}</div>
            <div className="data-box">
                <div className="score-part">
                    <div className="score-title">امتیاز هفته</div>
                    <div className="show-score-box">
                        <img className="star" src={star} alt="star for showing score"></img>
                        <div className="score">{toFarsiNumber(event.teamPoints)}</div>
                    </div>
                </div>
                <div className="changes-title" hidden={event.substitutions.length == 0}>تعویض ها</div>
                <div>
                    {event.substitutions.map(s => <div className="changes">
                            <img src={addIcon} alt="added players Icon"></img>
                            <div className="change-spot">{s.playerInId}</div>
                            <img src={removeIcon} alt="removed players Icon"></img>
                            <div className="change-spot">{s.playerOutId}</div>
                        </div>
                    )}
                </div>
            </div>
            <div className="profile-info">
                <img className="profile-photo" src={profilePhoto} alt="profile photo"></img>
                {/* <img className="profile-photo" src={axiosGetProfileImageUrl(event.imageUrl)} alt="profile photo"></img> */}
                <div className="name">{event.firstName} {event.lastName}</div>
                <img className="like" src={event.liked ? liked : like} alt="like" onClick={function () {
                    event.liked ? handleUnLike(event.eventId) : handleLike(event.eventId)
                }}></img>
            </div>
        </div>
    )
}

export default EventItem