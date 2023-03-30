import React from 'react';
import './profileModal.css';
import {atom, useRecoilState, useRecoilValue} from 'recoil';
import profilePhoto from '../latestEvents/profiles/assets/profilePhoto.jpeg';
import {userInfoType} from '../../../../global/Types';
import {toFarsiNumber} from '../../../../global/functions/Converters';
import {handleFollowing, handleUnfollow} from '../../../../global/functions/General';

export const profileModalDisplayState = atom<'none' | 'block'>({
    key: 'profileModalDisplayState',
    default: 'none'
})

export const currentUserState = atom<undefined | userInfoType>({
    key: 'currentUserState',
    default: undefined
})

export function ProfileModal() {
    const [profileModalDisplay, setProfileModalDisplay] = useRecoilState(profileModalDisplayState)
    const currentUser = useRecoilValue(currentUserState)

    return (
        <div className='back' onClick={() => {
            setProfileModalDisplay('none')
        }}>
            <div className='profile-modal-div' style={{display: profileModalDisplay}} onClick={e => {
                e.stopPropagation();
            }}>
                <div className='show-info'>
                    <img className="modal-profile-photo" src={profilePhoto} alt="profile photo"></img>
                    <button
                        className={currentUser?.followed ? "profile-modal-unfollow-button" : "profile-modal-following-button"}
                        onClick={() => currentUser?.followed ? handleUnfollow(currentUser.id) : handleFollowing(currentUser ? currentUser.id : " ")}>
                        {currentUser?.followed ? "دنبال نکردن" : "دنبال کردن"}
                    </button>
                    <div className='modal-profile-info'>
                        <div className='info-lable'>نام:
                            <div
                                className='info'>{currentUser?.fullName}</div>
                        </div>

                        <div className='info-lable'>سن:
                            <div className='info'>{currentUser && toFarsiNumber(currentUser.age)}</div>
                            سال
                        </div>
                        <div className='info-lable'>کشور:
                            <div className='info'>{currentUser && currentUser.country}</div>
                        </div>

                        <div className='info-lable'>آخرین امتیاز:
                            <div className='info'>{currentUser && currentUser.teamPoint &&
                                toFarsiNumber(currentUser.teamPoint)}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}