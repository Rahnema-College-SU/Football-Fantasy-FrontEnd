import React from "react";
import './RemainingPlayer.css';
import logo from './assets/playerLogo.svg'
import {atom, useRecoilState} from "recoil";
import {toFarsiNumber} from "../../../../global/Variables";

export const usedPlayerState = atom({
    key: 'usedPlayerState',
    default: 0
})

export function RemainingPlayer() {
    const [usedPlayer] = useRecoilState(usedPlayerState)

    return (
        <div className="player-box">
            <div id='show-player-text'> ۱۵/{toFarsiNumber(15 - usedPlayer)}</div>
            <div id='logo-and-text'>
                <img className='player-logo' src={logo} alt={'player'}></img>
                <span id='player-text'> بازیکن باقی مانده</span>
            </div>

        </div>
    );
}
