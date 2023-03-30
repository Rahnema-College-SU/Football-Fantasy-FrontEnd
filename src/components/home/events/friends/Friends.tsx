import React, {useState} from "react";
import "./Friends.css"
import searchIcon from "../mainSearchBox/assets/searchicon.png"
import profilePhoto from '../latestEvents/profiles/assets/profilePhoto.jpeg'
import {atom, useSetRecoilState} from "recoil";
import {searchResultUserType} from "../../../../global/Types";
import {handleFollowing} from "../../../../global/functions/General";
import {currentUserState, profileModalDisplayState} from "../profileModal/profileModal";
import {latestEventsDisplayState} from "../latestEvents/LatestEvents";
import {onAxiosError, onAxiosSuccess} from "../../../../global/Errors";
import {axiosFollowerSearch, axiosFollowingSearch, axiosUserInfo} from "../../../../global/ApiCalls";

export const usersListState = atom<Array<searchResultUserType>>({
    key: 'usersListState',
    default: []
})

export function Friends() {
    const tabs = [
        {name: "follower", text: "دنبال کنندگان"},
        {name: "following", text: "دنبال شوندگان"},
        {name: "latest-events", text: " "}
    ]
    const [selectedTab, setSelectedTab] = useState<typeof tabs[0]>(tabs[2])
    const [usersList, setUsersList] = useState<Array<searchResultUserType>>([])
    const [searchInput, setSearchInput] = useState('');
    const ProfileModalDisplay = useSetRecoilState(profileModalDisplayState)
    const latestEventBoxState = useSetRecoilState(latestEventsDisplayState)
    const setCurrentUser = useSetRecoilState(currentUserState)

    function handleSearch(txt: any, state: string) {
        if (state === "following") {
            axiosFollowingSearch(txt).then(
                res => {
                    onAxiosSuccess({
                        res: res,
                        myError: "invalidInputError",
                        onSuccess: () => setUsersList(res.data.data)
                    })
                },
                error => {
                    onAxiosError({axiosError: error, myError: "invalidInputError"})
                }
            )
        } else {
            axiosFollowerSearch(txt).then(
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
        }
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
        <div className="main-box">
            <div className="title"> دوستان شما</div>
            <div className="friends-box">
                <div className="friends-button-bar">
                    <button
                        className={selectedTab.name === "latest-events" ? "selected-button" && "latest-events" : "tipical-button" && "latest-events"}
                        onClick={() => {
                            setSelectedTab(tabs[2]);
                            latestEventBoxState("show");
                        }}>
                        <div
                            className={selectedTab.name === "latest-events" ? "selected-button-text" : "button-text"}> آخرین
                            رویدادها
                        </div>
                    </button>
                    <button className={selectedTab.name === "follower" ? "selected-button" : "tipical-button"}
                            onClick={() => {
                                setSelectedTab({name: "follower", text: "دنبال کنندگان"});
                                latestEventBoxState("none");
                                setSearchInput(' ');
                                setUsersList([]);
                            }}>
                        <div className={selectedTab.name === "follower" ? "selected-button-text" : "button-text"}>دنبال
                            کنندگان
                        </div>
                    </button>
                    <button className={selectedTab.name === "following" ? "selected-button" : "tipical-button"}
                            onClick={() => {
                                setSelectedTab({name: "following", text: "دنبال شوندگان"});
                                latestEventBoxState("none");
                                setSearchInput(' ');
                                setUsersList([]);
                            }}>
                        <div className={selectedTab.name === "following" ? "selected-button-text" : "button-text"}>دنبال
                            شوندگان
                        </div>
                    </button>
                </div>
                <div className={selectedTab.name != "latest-events" ? "" : "hidden"}>
                    <div className="friends-search-box">
                        <img className="search-icon" src={searchIcon} alt={'magnifier'}/>
                        <input className={'search-input'} placeholder={'جستجو'} value={searchInput} onChange={event => {
                            setSearchInput(event.target.value);
                            handleSearch(event.target.value, selectedTab.name)
                        }}/>
                    </div>
                    <div className="profiles-box">
                        {usersList.length == 0 ? "کاربری با این نام یافت نشد" :
                            usersList.map(user => <div className="profile">
                                <img className="friends-profile-photo" src={profilePhoto} alt="profile photo"
                                     onClick={() => showProfileModal(user.id.toString())}></img>
                                <div className="friends-name">{user.username}</div>
                                <button className={!user.followed ? "follow-back" : "see-profile"}
                                        onClick={() => {
                                            !user.followed ? handleFollowing(user.id.toString()) : showProfileModal(user.id.toString())
                                        }}>
                                    <div
                                        className="button-text">{!user.followed ? "دنبال کردن" : "مشاهده"} </div>
                                </button>
                            </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Friends