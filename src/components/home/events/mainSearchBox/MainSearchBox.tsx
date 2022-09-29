import React from "react";
import "./MainSearchBox.css"
import searchIcon from "./assets/searchicon.png";
import { searchResultUserListType,searchResultUserType  } from "../../../../global/Types";
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from 'recoil';
import { axiosAllUsersList } from "../../../../global/ApiCalls";
import { onAxiosSuccess , onAxiosError } from "../../../../global/Errors";
import Select ,{components ,DropdownIndicatorProps,IndicatorSeparatorProps} from "react-select";
import { useState } from "react";
import { IndicatorsContainer, indicatorsContainerCSS } from "react-select/dist/declarations/src/components/containers";
import { display } from "@mui/system";
import { isDisabled } from "@testing-library/user-event/dist/utils";
import { clearIndicatorCSS } from "react-select/dist/declarations/src/components/indicators";
import { ConsoleConstructorOptions } from "console";
import profilePhoto from '../latestEvents/profiles/assets/profilePhoto.jpeg'
import { profileModalDisplayState } from "../profileModal/profileModal";


export const usersListState = atom<searchResultUserListType>({
    key: 'usersListState',
    default: {
        usersList: [],
        numberOfusers: undefined
    }
})

// export const searchTextState = atom<string>({
//     key: 'searchTextState',
//     default: ''
// })

// const usersList=[
//     {id:"sh"},{id:"q"},{id:"a"}
// ]

//let debounceFunction: { (this: ThisParameterType<() => void>, ...args: Parameters<() => void> & any[]): Promise<ReturnType<() => void>>; cancel: (reason?: any) => void }


    // axiosAllUsersList(searchText).then(
    //     res => {
    //         onAxiosSuccess({
    //             res: res, myError: invalidInputError, onSuccess: () => {
                    
    //             }
    //         })

    //     },
    //     error => {
    //         onAxiosError({axiosError: error, myError: invalidInputError})
    //     }
    // )



export function MainSearchBox() {
    // const profileModalDisplay = useSetRecoilState(profileModalDisplayState)
    const [search,setSearch] =useState();
    const optionList=[
        {value:"red" ,label:<div className="profile" >
        <img className="friends-profile-photo" src={profilePhoto} alt="profile photo"></img>
        <div className="friends-name">first and last name</div>
        <button className="follow-back">
        <div className="button-text"> دنبال کردن</div>
        </button>
        </div>},
        {value:"pink" ,label:<div className="profile">
        <img className="friends-profile-photo" src={profilePhoto} alt="profile photo"></img>
        <div className="friends-name">first and last name</div>
        <button className="follow-back">
        <div className="button-text"> دنبال کردن</div>
        </button>
        </div>}
    ];
    function handleSearch(data:any){
        setSearch(data)
    }
    const IndicatorSeparator = ()=>{}
    const DropdownIndicator=(props: DropdownIndicatorProps<ConsoleConstructorOptions,true>)=>{
        return(
            <div onClick={()=>{}}>
                <img className="search-icon" src={searchIcon} alt={'magnifier'}/>
            </div>
        );
    };
    

    return (
        <div>
        {/* <div className={'main-search-box'}>
        
        <input className={'main-search-input'} placeholder={'اسم دوستات رو جستجو کن و دنبالشون کن'} />
        </div> */}

{        //@ts-ignore
}        <Select className="main-search-box" options={optionList} components={{DropdownIndicator ,IndicatorSeparator}} 
        placeholder={<div className="placeholder"> 
        اسم دوستات رو جستجو کن و دنبالشون کن
        </div>} onChange={handleSearch} isSearchable={true} >
        <img className="search-icon" src={searchIcon} alt={'magnifier'}/>
        </Select>
        
        {/* <select className="main-search-result">
        <option value=""> کشور</option>
        </select> */}
        </div>
    )
}

export default MainSearchBox