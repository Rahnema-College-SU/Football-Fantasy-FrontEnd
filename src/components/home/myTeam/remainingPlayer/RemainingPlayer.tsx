import React from "react";
import './RemainingPlayer.css';
import logo from './assets/playerLogo.svg'


export function RemainingPlayer() {
    return (
        <div className="playerBox">
            <span id='showPlayerText'> ۱۵/۱۲</span>
            <div id='logo-and-text'>
                <img className='playerLogo' src={logo} alt={'player'}></img>
                <span id='playerText'> بازیکن باقی مانده</span>
            </div>

        </div>
    );
}
