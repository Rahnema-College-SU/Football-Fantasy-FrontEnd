import React from "react";
import './MyTeamSideListPlayer.css'
import activeCloth from "../../../assets/active-cloth.svg";
import inactiveCloth from "../../../assets/inactive-cloth.svg";
import {playerType} from "../../../../../global/Types";
import {atom, useRecoilState} from "recoil";

export const selectedReservePlayerState = atom<playerType | undefined>({
    key: 'selectedReservePlayerState',
    default: undefined
})

export function MyTeamSideListPlayer({className, player}: { className?: string, player: playerType | undefined }) {
    const [selectedReservePlayer, setSelectedReservePlayer] = useRecoilState(selectedReservePlayerState)

    function getActive(player: playerType) {
        function isPLayerSelected() {
            return selectedReservePlayer && selectedReservePlayer.id === player.id
        }

        return (
            <div className={className + (isPLayerSelected() ? ' selected-cloth-div' : '')}>
                <img className={'reserve-cloth'} src={activeCloth} alt={'active reserve player'} onClick={() => {
                    if (isPLayerSelected())
                        setSelectedReservePlayer(undefined)
                    else
                        setSelectedReservePlayer(player)
                }}/>
                <div className={'my-team-player-name' + (isPLayerSelected() ? ' reserve-player-name-selected' : '')}>
                    {player.webName}
                </div>
            </div>
        )
    }

    function getInactive() {
        return (
            <div className={className}>
                <img className={'reserve-cloth inactive-reserve-cloth'} src={inactiveCloth}
                     alt={'inactive reserve player'}/>
                <div style={{visibility: 'hidden'}}>fake</div>
            </div>
        )
    }

    return (
        player ? getActive(player) : getInactive()
    )
}