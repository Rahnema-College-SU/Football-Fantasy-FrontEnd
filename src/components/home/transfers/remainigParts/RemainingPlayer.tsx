import React from "react";
import logo from './assets/playerLogo.svg'
import {atom, useRecoilValue} from "recoil";
import {Remaining} from "./Remaining";
import {toFarsiNumber} from "../../../../global/functions/Converters";

export const usedPlayerState = atom<undefined | number>({
    key: 'usedPlayerState',
    default: undefined
})

export function RemainingPlayer() {
    const usedPlayer = useRecoilValue(usedPlayerState)

    return (
        <Remaining showingText={usedPlayer !== undefined ? `${toFarsiNumber(15 - usedPlayer)}/۱۵` : undefined}
                   src={logo}
                   text={'بازیکن باقی مانده'}
                   backgroundStyle={'linear-gradient(93.79deg, #04F7DA -6.31%, #02FDA2 118.26%)'} alt={'player'}/>
    );
}
