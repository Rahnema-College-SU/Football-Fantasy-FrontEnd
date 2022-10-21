import React from 'react';
import './profileModal.css';
import {atom} from 'recoil';
import profilePhoto from '../latestEvents/profiles/assets/profilePhoto.jpeg';
import { latestEventType, userInfoType } from '../../../../global/Types';
import { useRecoilState } from 'recoil';
import { toFarsiNumber } from '../../../../global/functions/Converters';
import { axiosFollow } from '../../../../global/ApiCalls';
import { handleFollowing } from '../../../../global/functions/General'; 

// export const isFollowingClickedState = atom<boolean>({
//     key: 'isFollowingClickedState',
//     default: false
// })

export const profileModalDisplayState = atom<'none' | 'block'>({
    key: 'profileModalDisplayState',
    default: 'none'
})

export const currentUserState = atom< undefined | userInfoType>({
    key:'currentUserState',
    default: undefined
})

const r ={
    "id": "ff13da9b-2302-45bd-8b64-fa62483de49d",
    "username": "mahdi07",
    "firstName": "mahdi",
    "lastName": "mahdavi",
    "fullName": "mahdi mahdavi",
    "country": "iran",
    "imageUrl": "",
    "teamPoint": 11,
    "age": 23,
    "followed": false
}

export function ProfileModal() {
    const [profileModalDisplay, setProfileModalDisplay] = useRecoilState(profileModalDisplayState)
    const [currentUser,setCurrentUser] = useRecoilState(currentUserState)
    // useEffect(() => {
    //     if (profileModalDisplay === 'none')
    //         console.log("display none")
    // }, [profileModalDisplay])
    // useEffect(()=>{
    //     setCurrentUser(r)
    // })

    return (
        <div className='back' onClick={() => {
            setProfileModalDisplay('none')
        }}>
            <div className='profile-modal-div' style={{display: profileModalDisplay}} onClick={e => {
                e.stopPropagation();
            }}>
                <div className='show-info'>
                    <img className="modal-profile-photo" src={profilePhoto} alt="profile photo"></img>
                    <button className='profile-modal-following-button' onClick={()=>handleFollowing(currentUser?currentUser.id:"")}> دنبال کردن</button>
                    <div className='modal-profile-info'>
                        <div className='info-lable'>نام:
                            <div className='info'>{currentUser&& currentUser.firstName }{currentUser&& currentUser.lastName }</div>
                        </div>

                        <div className='info-lable'>سن:
                            <div className='info'>{currentUser&& toFarsiNumber(currentUser.age) }</div>
                        </div>

                        <div className='info-lable'>کشور:
                            <div className='info'>{currentUser&& currentUser.country }</div>
                        </div>

                        <div className='info-lable'>آخرین امتیاز:
                            <div className='info'>{currentUser&& toFarsiNumber(currentUser.teamPoint) }</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}