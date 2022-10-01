import React, {useState} from "react";
import "./MainSearchBox.css"
import searchIcon from "./assets/searchicon.png";
import {searchResultUserType} from "../../../../global/Types";
import {atom, useRecoilState} from 'recoil';
import {axiosFollow} from "../../../../global/ApiCalls";
import {invalidInputError, onAxiosError, onAxiosSuccess} from "../../../../global/Errors";
import profilePhoto from '../latestEvents/profiles/assets/profilePhoto.jpeg'
import {ClickAwayListener} from "@mui/material";


export const usersListState = atom<Array<searchResultUserType>>({
    key: 'usersListState',
    default: []
})


const users =
    {
        "data": [
            {
                "id": "c6b7e186-7384-4433-91e4-78bf441d9450",
                "username": "amir",
                "imageUrl": "",
                "isFollowed": false
            },
            {
                "id": "7f8123fd-a049-475f-ad38-750ef9e4c84d",
                "username": "aminsaveh80",
                "imageUrl": "",
                "isFollowed": false
            },
            {
                "id": "57bf69e5-d210-4e7f-8b38-ab37e1e4ad89",
                "username": "hadidortaj",
                "imageUrl": "",
                "isFollowed": false
            },
            {
                "id": "76dc0b29-d99e-4d98-b043-e7e61211ec66",
                "username": "hadidortaj2",
                "imageUrl": "",
                "isFollowed": false
            }
        ],
        "success": true,
        "errorMessage": ""
    }

export function MainSearchBox() {

    const [usersList, setUsersList] = useRecoilState(usersListState)
    const [resultBoxState, setResultBoxState] = useState(false)

    function handleSearch(data: any) {
        // axiosAllUsersList(data).then(
        // res => {
        //     onAxiosSuccess({
        //         res: res, myError: invalidInputError, onSuccess: () => {
        //             setUsersList(res.data.data)
        //         }
        //     })

        // },
        // error => {
        //     onAxiosError({axiosError: error, myError: invalidInputError})
        // }
        // )
        setUsersList(users.data)
        setResultBoxState(true)
    }

    function handleFollow(id: String) {
        ////needs to be complited
        axiosFollow(id).then(
            res => {
                onAxiosSuccess({
                    res: res, myError: invalidInputError, onSuccess: () => {
                        setUsersList(res.data.data)
                    }
                })

            },
            error => {
                onAxiosError({axiosError: error, myError: invalidInputError})
            }
        )
    }

    function showProfileModel() {
        //TODO: needs to be complited
    }

    return (
        <div>

            <div className="main-search-box">
                <ClickAwayListener onClickAway={() => setResultBoxState(false)}>
                    <div className={'search-box'}>

                        <img className="search-icon" src={searchIcon} alt={'magnifier'}/>
                        <input className={'search-input'} placeholder={'اسم دوستات رو جستجو کن و دنبالشون کن'}
                               onChange={event => {
                                   handleSearch(event.target)
                               }} onClick={event => {
                            handleSearch(event.target)
                        }}/>
                    </div>
                </ClickAwayListener>
                <div className="result-box" hidden={!resultBoxState}>
                    {usersList.map(user => <div className="profile">
                        <img className="friends-profile-photo" src={profilePhoto} alt="profile photo"></img>
                        <div className="friends-name">{user.username}</div>
                        <button className="follow-back" onClick={() => handleFollow(user.id)}>
                            <div className="button-text"> دنبال کردن</div>
                        </button>
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default MainSearchBox