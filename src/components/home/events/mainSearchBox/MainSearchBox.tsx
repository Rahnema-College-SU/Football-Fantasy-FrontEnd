import React from "react";
import "./MainSearchBox.css"
import searchIcon from "./assets/searchicon.png";

// export const usersListState = atom<usersListType>({
//     key: 'usersListState',
//     default: {
//         usersList: [],
//         //add number of users
//     }
// })

const usersList=[
    {id:"sh"},{id:"q"},{id:"a"}
]

export function MainSearchBox() {
    return (
        <div>
        <div className={'main-search-box'}>
        <img className={'main-search-icon'} src={searchIcon} alt={'magnifier'}/>
        <input className={'main-search-input'} placeholder={'اسم دوستات رو جستجو کن و دنبالشون کن'} />
        </div>
        <select className="main-search-result">
        <option value=""> کشور</option>
        </select>
        </div>
    )
}

export default MainSearchBox