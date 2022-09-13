import React, {useEffect, useState} from "react";
import "./ChoosePlayer.css";
import searchIcon from "./assets/searchicon.png";
import up from "./assets/up.svg";
import next from "./assets/next.svg";
import nextLast from "./assets/nextl.svg";
import previous from "./assets/previous.svg";
import PreviousLast from "./assets/previousl.svg";
import {axiosPlayerList} from "../../../../global/ApiCalls";


//const myList=http.get('players_list' ,{params: {"List_size":20}}).then(res=>res.data)
type Player =
    {
        "id": number, "first_name": string,
        "last_name": String,
        "web_name": String,
        "position": { "name": String, "short_name": String },
        "real_team": { "name": String, "short_name": String },
        "player_week_log": { "player_cost": String, "player_total_points": String }
    }


function ChoosePlayer() {
    const [playersList, setPlayersList] = useState<undefined | Player[]>(undefined);
    let getData = async () => {
        await axiosPlayerList().then(res => setPlayersList(res.data.players_list))
    }
    useEffect(() => {
        getData()
        console.log(playersList)
    }, [])
    // http.get('').then(res => console.log(res))
    return (
        <div id={'aaaa'}>
            <div className="title">
                <div id="titleText">انتخاب بازیکن</div>
            </div>
            <div id="mainBox">
                <div id="searchBox">
                    <img src={searchIcon} alt={"magnifier"}/>
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
                        {playersList?.map((x) => (
                            <li className="playerListItem">
                                <span>{x.position.short_name}</span>
                                <span>{x.player_week_log.player_cost}</span>
                                <div id="playerListItemName">
                                    <div>{x.web_name}</div>
                                    <div id="playerListItemTeam">{x.real_team.short_name}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div id="pageBar">
                        <button className="pageBarItem">
                            <img src={PreviousLast} alt="previous last pages"/>
                            <img src={PreviousLast} alt="previous last pages"/>
                        </button>
                        <button className="pageBarItem">
                            <img src={previous} alt="previous page"/>
                        </button>
                        <text id="showPageState">صفحه ۱ از ۲</text>
                        <button className="pageBarItem">
                            <img src={next} alt="next page"/>
                        </button>
                        <button className="pageBarItem">
                            <img src={nextLast} alt="next last pages"/>
                            <img src={nextLast} alt="next last pages"/>
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

function CreatePageBar() {

}

export default ChoosePlayer;
