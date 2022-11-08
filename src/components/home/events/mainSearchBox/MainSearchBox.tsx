import React, {useEffect, useState} from "react";
import "./MainSearchBox.css"
import searchIcon from "./assets/searchicon.png";
import {searchResultUserType} from "../../../../global/Types";
import {atom, useRecoilState, useSetRecoilState} from 'recoil';
import profilePhoto from '../latestEvents/profiles/assets/profilePhoto.jpeg'
import {ClickAwayListener} from "@mui/material";
import {handleFollowing} from "../../../../global/functions/General";
import {profileModalDisplayState} from "../profileModal/profileModal";
import { currentUserState } from "../profileModal/profileModal";
import { axiosAllUsersList } from "../../../../global/ApiCalls";
import { onAxiosError } from "../../../../global/Errors";
import { onAxiosSuccess } from "../../../../global/Errors";
import { axiosUserInfo } from "../../../../global/ApiCalls";

export const usersListState = atom<Array<searchResultUserType>>({
    key: 'usersListState',
    default: []
})


const users =
    {
        "data": [
            {
                "id": "ff13da9b-2302-45bd-8b64-fa62483de49d",
                "firstName": "mahdi",
                "lastName": "mahdavi",
                "fullName": "mahdi mahdavi",
                "username": "mahdi07",
                "imageUrl": "",
                "followed": false
            },
            {
                "id": "f2283794-4047-46c7-8b98-80b459bf5296",
                "firstName": "amir",
                "lastName": "amir",
                "fullName": "amir amir",
                "username": "amir",
                "imageUrl": "",
                "followed": false
            },
            {
                "id": "45336d61-a50c-4c02-8649-4582366d260e",
                "firstName": "amin",
                "lastName": "saveh",
                "fullName": "amin saveh",
                "username": "aminsaveh",
                "imageUrl": "",
                "followed": false
            },
            {
                "id": "21893705-03f3-4d05-8f5c-c45ae0b54ef3",
                "firstName": "hadi",
                "lastName": "dortaj",
                "fullName": "hadi dortaj",
                "username": "hadidortaj",
                "imageUrl": "",
                "followed": true
            },
            {
                "id": "66e2d7fa-48cf-46ea-a02b-937eb314df4c",
                "firstName": "hadi",
                "lastName": "dortaj",
                "fullName": "hadi dortaj",
                "username": "hadidortaj3",
                "imageUrl": "",
                "followed": true
            }
        ],
        "frontMessage": "",
        "userMessage": ""
    }

export function MainSearchBox() {

    const [usersList, setUsersList] = useRecoilState(usersListState)
    const [resultBoxState, setResultBoxState] = useState(false)
    const ProfileModalDisplay = useSetRecoilState(profileModalDisplayState)
    const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
    useEffect(() => {
        //setUsersList(users.data)
    })

    function handleSearch(data: any) {
        axiosAllUsersList(data).then(
        res => {
            onAxiosSuccess({
                res: res, myError: "invalidInputError", onSuccess: () => {
                    setUsersList(res.data.data)
                    //console.log(usersList)
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
                    //console.log(res.data.data)
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
                               }} />
                    </div>
                <ClickAwayListener onClickAway={() => setResultBoxState(false)}>
                <div className="result-box" hidden={!resultBoxState} >
                    {usersList.map(user => <div className="profile">
                        <img className="friends-profile-photo" src={profilePhoto} alt="profile photo" onClick={() => {
                           showProfileModal(user.id.toString())
                        }}></img>
                        <div className="friends-name">{user.username}</div>
                        <button className={user.followed === false ? "follow-back" : "see-profile"} onClick={() => {
                            user.followed === false ? handleFollowing(user.id) :showProfileModal(user.id.toString())
                        }}>
                            <div className="button-text">{user.followed === false ? "دنبال کردن" : "مشاهده"} </div>
                        </button>
                    </div>)}
                </div>
                </ClickAwayListener>
            </div>
        </div>
    )
}

export default MainSearchBox