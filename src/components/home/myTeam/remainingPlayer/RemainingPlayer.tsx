import React from "react";
import './RemainingPlayer.css';
import logo from './assets/playerLogo.svg'
import {atom, useRecoilState} from "recoil";
import {toFarsiNumber} from "../../../../GlobalVariables";

export const remainingPlayerState = atom({
    key: 'remainingPlayerState',
    default: 0
})

export function RemainingPlayer() {
    const [remainingPlayer] = useRecoilState(remainingPlayerState)

    return (
        <div className="player-box">
            <div id='show-player-text'> ۱۵/{toFarsiNumber(remainingPlayer)}</div>
            <div id='logo-and-text'>
                <img className='player-logo' src={logo} alt={'player'}></img>
                <span id='player-text'> بازیکن باقی مانده</span>
            </div>

        </div>
    );
}
