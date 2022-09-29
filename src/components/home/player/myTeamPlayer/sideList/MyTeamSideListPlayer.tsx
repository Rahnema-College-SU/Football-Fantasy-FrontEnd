import React from "react";
import './MyTeamSideListPlayer.css'
import activeCloth from "../../../assets/active-cloth.svg";
import inactiveCloth from "../../../assets/inactive-cloth.svg";
import {playerType} from "../../../../../global/Types";
import {useRecoilState} from "recoil";
import {selectedReservePlayerState} from "../../../myTeam/sideList/MyTeamSideList";

export function MyTeamSideListPlayer({className, player}: { className?: string, player: playerType | undefined }) {
    const [selectedReservePlayer, setSelectedReservePlayer] = useRecoilState(selectedReservePlayerState)

    function getActivePlayer(player: playerType) {
        function isPLayerSelected() {
            return selectedReservePlayer && selectedReservePlayer.id === player.id
        }

        function getNameClassName() {
            const baseClassName = 'reserve-player-name'

            if (isPLayerSelected())
                return baseClassName + ' reserve-player-name-selected'
            else
                return baseClassName
        }

        return (
            <div className={className}>
                <img className={'reserve-cloth'} src={activeCloth} alt={'active reserve player'} onClick={() => {
                    if (isPLayerSelected())
                        setSelectedReservePlayer(undefined)
                    else
                        setSelectedReservePlayer(player)
                }}/>
                <div className={getNameClassName()}>{player.webName}</div>
            </div>
        )
    }

    function getInactivePlayer() {
        return (
            <div className={className}>
                <img className={'reserve-cloth inactive-reserve-cloth'} src={inactiveCloth} alt={'inactive reserve player'}/>
                <div className={'reserve-player-name'} style={{visibility: 'hidden'}}>fake</div>
            </div>
        )
    }

    return (
        player ? getActivePlayer(player) : getInactivePlayer()
    )
}