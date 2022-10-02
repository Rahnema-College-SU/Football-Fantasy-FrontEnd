import React from 'react';
import './profileModal.css';
import {atom, useRecoilState} from 'recoil';
import profilePhoto from '../latestEvents/profiles/assets/profilePhoto.jpeg';

export const isFollowingClickedState = atom<boolean>({
    key: 'isFollowingClickedState',
    default: false
})

export const profileModalDisplayState = atom<'none' | 'block'>({
    key: 'profileModalDisplayState',
    default: 'none'
})


export function ProfileModal() {
    const [profileModalDisplay, setProfileModalDisplay] = useRecoilState(profileModalDisplayState)

    return (
        <div className='back' onClick={() => {
            setProfileModalDisplay('none')
        }}>
            <div className='profile-modal-div' style={{display: profileModalDisplay}} onClick={e => {
                e.stopPropagation();
            }}>
                <div className='show-info'>
                    <img className="modal-profile-photo" src={profilePhoto} alt="profile photo"></img>
                    <button className='profile-modal-following-button '> دنبال کردن</button>
                    <div className='modal-profile-info'>
                        <div className='info-lable'>نام:
                            <div className='info'>اسم</div>
                        </div>

                        <div className='info-lable'>سن:
                            <div className='info'>۵۸</div>
                        </div>

                        <div className='info-lable'>کشور:
                            <div className='info'>ایران</div>
                        </div>

                        <div className='info-lable'>آخرین امتیاز:
                            <div className='info'>۱۱۲</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}