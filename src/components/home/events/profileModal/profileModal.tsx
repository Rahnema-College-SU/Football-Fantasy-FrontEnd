import React, { useEffect } from 'react';
import './profileModal.css';
import {atom, useRecoilState} from 'recoil';
import profilePhoto from '../latestEvents/profiles/assets/profilePhoto.jpeg';
import {userInfoType} from '../../../../global/Types';
import {toFarsiNumber} from '../../../../global/functions/Converters';
import {handleFollowing} from '../../../../global/functions/General';
import { handleUnfollow } from '../../../../global/functions/General';

export const profileModalDisplayState = atom<'none' | 'block'>({
    key: 'profileModalDisplayState',
    default: 'none'
})

export const currentUserState = atom<undefined | userInfoType>({
    key: 'currentUserState',
    default: undefined
})

const r = {
    "id": "ff13da9b-2302-45bd-8b64-fa62483de49d",
    "username": "mahdi07",
    "firstName": "mahdi",
    "lastName": "mahdavi",
    "fullName": "mahdi mahdavi",
    "country": "iran",
    "imageUrl": "",
    "teamPoint": 11,
    "age": 23,
    "followed": true
}

export function ProfileModal() {
    const [profileModalDisplay, setProfileModalDisplay] = useRecoilState(profileModalDisplayState)
    const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
    //useEffect(()=>{setCurrentUser(r)})
    useEffect(() => {
        if (profileModalDisplay === 'none')
            console.log("display none")
    }, [profileModalDisplay])
    useEffect(()=>{
        console.log(currentUser)
    })

    return (
        <div className='back' onClick={() => {
            setProfileModalDisplay('none')
        }}>
            <div className='profile-modal-div' style={{display: profileModalDisplay}} onClick={e => {
                e.stopPropagation();
            }}>
                <div className='show-info'>
                    <img className="modal-profile-photo" src={profilePhoto} alt="profile photo"></img>
                    <button className={currentUser?.followed?"profile-modal-unfollow-button":"profile-modal-following-button"}
                            onClick={() => currentUser?.followed ?handleUnfollow(currentUser.id): handleFollowing( currentUser?currentUser.id :" ")}> 
                            {currentUser?.followed?"دنبال نکردن":"دنبال کردن"}
                    </button>
                    <div className='modal-profile-info'>
                        <div className='info-lable'>نام:
                            <div
                                className='info'>{currentUser?.fullName}</div>
                        </div>

                        <div className='info-lable'>سن:
                            <div className='info'>{currentUser && toFarsiNumber(currentUser.age)}</div>
                            {/* <div className='info'>{currentUser && currentUser.age}</div> */}
                            سال
                        </div>
                        <div className='info-lable'>کشور:
                            <div className='info'>{currentUser && currentUser.country}</div>
                        </div>

                        <div className='info-lable'>آخرین امتیاز:
                            <div className='info'>{currentUser && toFarsiNumber(currentUser.teamPoint)}</div>
                            {/* <div className='info'>{currentUser && currentUser.teamPoint}</div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}