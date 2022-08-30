import React, { Component } from "react";
import './choosePlayer.css'
import searchIcon from '../../assets/choosePlayer/searchicon.png';
import up from '../../assets/choosePlayer/up.svg'
import next from '../../assets/choosePlayer/next.svg'
import nextLast from '../../assets/choosePlayer/nextl.svg'
import previous from '../../assets/choosePlayer/previous.svg'
import PreviousLast from '../../assets/choosePlayer/previousl.svg'

import { Dir } from "fs";

// interface PlayerListItem  {
    
// name: string,
//     clubName: string,
//     score: number
    
    
// }

// var PlaryerSample: PlayerListItem[] ={
    
// }
// var PlaryerListSample: PlayerListItem[] =[]

// for(var a:number=0;a<10;a++){
// PlaryerListSample.push(PlaryerSample)
// }

const myList = [{name:"shakiba",clubName:"bar" ,price:8, performance:8},{name:"messi",clubName:"bar" ,price:8.5, performance:10},]


function ChoosePlayer(){
return(
<div>
    <div className="title">
        <div id="titleText">انتخاب بازیکن</div>
    </div>
    <div id="mainBox">
    <div id="searchBox">
        <img src={searchIcon} />
        <text id="searchHint">جستجو </text>
    </div>
    <div id="filterBar">
        
        <button className="filterItem">ATT</button>
        <button className="filterItem">MID</button>
        <button className="filterItem">DEF</button>
        <button className="filterItem">GK</button>
        <button className="selectedFilterItem filterItem">All</button>
    </div>
    <div id="totalPlayersNumber">
<text id="totalPlayersNumberText">بازیکن نمایش داده شده است .</text>
    </div>
    <div id="showPlayersFrame">
        <div id="titleBar">
            <div id="playerTitle">نام بازیکن</div>
            <div>عملکرد</div>
            <img className="upIcon" src={up}></img>
            <div>قیمت</div>
            <img className="upIcon" src={up}></img> 
        </div>
        <ul id="playersList">
{myList.map(x=><li className="playerListItem"> <span>{x.price}</span><span>{x.performance}</span> 
<div id="playerListItemName">
    <div>{x.name}</div>
    <div id="playerListItemTeam">{x.clubName}</div>
</div> 
</li>)}
        </ul>
        <div id="pageBar">
        
       <button className="pageBarItem">
        <img src={PreviousLast} alt="previous last pages" />
        <img src={PreviousLast} alt="previous last pages" />
       </button>
       <button className="pageBarItem">
        <img src={previous} alt="previous page"/>
       </button>
       <text id="showPageState">صفحه ۱ از ۲</text>
       <button className="pageBarItem">
        <img src={next} alt="next page"/>
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
export default ChoosePlayer;