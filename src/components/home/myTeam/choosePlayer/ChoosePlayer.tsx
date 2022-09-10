import React from "react";
import "./ChoosePlayer.css";
import searchIcon from "./assets/searchicon.png";
import up from "./assets/up.svg";
import next from "./assets/next.svg";
import nextLast from "./assets/nextl.svg";
import previous from "./assets/previous.svg";
import PreviousLast from "./assets/previousl.svg";

const myList = [
  { name: "shakiba", clubName: "bar", price: 8, performance: 8 },
  {
    name: "messi",
    clubName: "bar",
    price: 8.5,
    performance: 10,
  },
];

function ChoosePlayer() {
  return (
    <div>
      <div className="title">
        <div id="titleText">انتخاب بازیکن</div>
      </div>
      <div id="mainBox">
        <div id="searchBox">
          <img src={searchIcon} alt={"magnifier"} />
          <text id="searchHint">جستجو</text>
        </div>
{CreateFilterBar()}
        <div id="totalPlayersNumber">
          <text id="totalPlayersNumberText">بازیکن نمایش داده شده است .</text>
        </div>
        <div id="showPlayersFrame">
          <div id="titleBar">
            <div id="playerTitle">نام بازیکن</div>
            <div>عملکرد</div>
            <img className="upIcon" src={up} alt={"decreasing sort"}></img>
            <div>قیمت</div>
            <img className="upIcon" src={up} alt={"decreasing sort"}></img>
          </div>
          <ul id="playersList">
            {myList.map((x) => (
              <li className="playerListItem">
                <span>{x.price}</span>
                <span>{x.performance}</span>
                <div id="playerListItemName">
                  <div>{x.name}</div>
                  <div id="playerListItemTeam">{x.clubName}</div>
                </div>
              </li>
            ))}
          </ul>
          <div id="pageBar">
            <button className="pageBarItem">
              <img src={PreviousLast} alt="previous last pages" />
              <img src={PreviousLast} alt="previous last pages" />
            </button>
            <button className="pageBarItem">
              <img src={previous} alt="previous page" />
            </button>
            <text id="showPageState">صفحه ۱ از ۲</text>
            <button className="pageBarItem">
              <img src={next} alt="next page" />
            </button>
            <button className="pageBarItem">
              <img src={nextLast} alt="next last pages" />
              <img src={nextLast} alt="next last pages" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CreateFilterBar() {
  const filterItems = ["ATT", "MID", "DEF", "GK"];

  return (
    <div id="filterBar">
      {filterItems.map((item) => (
        <button className="filterItem">{item}</button>
      ))}
      <button className="selectedFilterItem filterItem">All</button>
    </div>
  );
}
function CreatePageBar(){
    
}
export default ChoosePlayer;
