import React from "react";
import "./mainSearchBox.css"
import searchIcon from "./assets/searchicon.png";

export function MainSearchBox() {
    return (
        <div className="searchBox">
            <img src={searchIcon} alt={"magnifier"}/>
            <text className="searchHint">اسم دوستات رو جستجو کن و دنبالشون کن</text>
        </div>
    )
}

export default MainSearchBox