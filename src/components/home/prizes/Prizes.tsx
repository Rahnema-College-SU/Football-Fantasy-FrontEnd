import React from "react";
import './Prizes.css';
import comingSoon from './assets/coming-soon.gif'
import winnerCup from './assets/winner-cup.svg'

function Prizes() {
    return (
        <div id={'prizes-main-div'}>
            <img id={'prizes-winner-cup-image'} src={winnerCup} alt={'winner cup'}/>
            <img id={'prizes-coming-soon-image'} src={comingSoon} alt={'coming soon'}/>
        </div>
    )
}

export default Prizes