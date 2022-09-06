import React from "react";
import './remainingPlayer.css';
import logo from '../../../../assets/remainingPlayer/playerLogo.svg'


export function RemainingPlayer() {
    return (
        <div className="playerBox">
            <span id='showPlayerText'> ۱۵/۱۲</span>
            <div id='logo-and-text'>
                <img className='logo' src={logo} alt={'player'}></img>
                <span id='playerText'> بازیکن باقی مانده</span>
            </div>

        </div>
    );
}
