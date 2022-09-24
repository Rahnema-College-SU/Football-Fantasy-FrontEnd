import React from "react";
import "./MainSearchBox.css"
import searchIcon from "./assets/searchicon.png";

export function MainSearchBox() {
    return (
        <div className="searchBox">
            <img src={searchIcon} alt={"magnifier"}/>
            <div className="searchHint">اسم دوستات رو جستجو کن و دنبالشون کن</div>
        </div>
    )
}

export default MainSearchBox