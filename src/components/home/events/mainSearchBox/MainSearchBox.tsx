import React from "react";
import "./MainSearchBox.css"
import searchIcon from "./assets/searchicon.png";

export function MainSearchBox() {
    return (
        <div className={'main-search-box'}>
                <img className={'main-search-icon'} src={searchIcon} alt={'magnifier'}/>
                <input className={'main-search-input'} placeholder={'اسم دوستات رو جستجو کن و دنبالشون کن'} />
        </div>
    )
}

export default MainSearchBox