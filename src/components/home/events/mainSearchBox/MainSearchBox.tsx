import React, {useState} from "react";
import "./MainSearchBox.css"
import searchIcon from "./assets/searchicon.png";
import {searchResultUserType} from "../../../../global/Types";
import {atom, useRecoilState, useSetRecoilState} from 'recoil';
import profilePhoto from '../latestEvents/profiles/assets/profilePhoto.jpeg'
import {ClickAwayListener} from "@mui/material";
import {handleFollowing} from "../../../../global/functions/General";
import {currentUserState, profileModalDisplayState} from "../profileModal/profileModal";
import {axiosAllUsersList, axiosUserInfo} from "../../../../global/ApiCalls";
import {onAxiosError, onAxiosSuccess} from "../../../../global/Errors";

export const usersListState = atom<Array<searchResultUserType>>({
    key: 'usersListState',
    default: []
})

export function MainSearchBox() {

    const [usersList, setUsersList] = useRecoilState(usersListState)
    const [resultBoxState, setResultBoxState] = useState(false)
    const ProfileModalDisplay = useSetRecoilState(profileModalDisplayState)
    const setCurrentUser = useSetRecoilState(currentUserState)

    function handleSearch(data: any) {
        axiosAllUsersList(data).then(
            res => {
                onAxiosSuccess({
                    res: res, myError: "invalidInputError", onSuccess: () => {
                        setUsersList(res.data.data)
                    }
                })

            },
            error => {
                onAxiosError({axiosError: error, myError: "invalidInputError"})
            }
        )
        setResultBoxState(true)
    }

    function showProfileModal(id: string) {
        axiosUserInfo(id).then(
            res => {
                onAxiosSuccess({
                    res: res, myError: "invalidInputError", onSuccess: () => {
                        setCurrentUser(res.data.data)
                    }
                })

            },
            error => {
                onAxiosError({axiosError: error, myError: "invalidInputError"})
            }
        )

        ProfileModalDisplay('block')
    }

    return (
        <div>
            <div className="main-search-box">
                <div className={'search-box'}>
                    <img className="search-icon" src={searchIcon} alt={'magnifier'}/>
                    <input className={'search-input'} placeholder={'اسم دوستات رو جستجو کن و دنبالشون کن'}
                           onChange={event => {
                               handleSearch(event.target.value)
                           }}/>
                </div>
                <ClickAwayListener onClickAway={() => setResultBoxState(false)}>
                    <div className="result-box" hidden={!resultBoxState}>
                        {usersList.map(user => <div className="profile">
                            <img className="friends-profile-photo" src={profilePhoto} alt="profile photo"
                                 onClick={() => {
                                     showProfileModal(user.id.toString())
                                 }}></img>
                            <div className="friends-name">{user.username}</div>
                            <button className={!user.followed ? "follow-back" : "see-profile"} onClick={() => {
                                !user.followed ? handleFollowing(user.id) : showProfileModal(user.id.toString())
                            }}>
                                <div className="button-text">{!user.followed ? "دنبال کردن" : "مشاهده"} </div>
                            </button>
                        </div>)}
                    </div>
                </ClickAwayListener>
            </div>
        </div>
    )
}

export default MainSearchBox