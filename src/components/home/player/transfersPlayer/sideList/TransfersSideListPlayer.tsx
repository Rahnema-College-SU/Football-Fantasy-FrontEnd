import './TransfersSideListPlayer.css'
import React from "react";
import {useRecoilState} from "recoil";
import {selectedPlayerState} from "../../../transfers/sideList/TransfersSideList";
import {playerType, positionsUiType} from "../../../../../global/Types";
import {toFarsiNumber} from "../../../../../global/functions/Converters";

export function TransfersSideListPlayer({
                                            player,
                                            setSelectedPositionBySelectedFilterItem
                                        }: { player: playerType, setSelectedPositionBySelectedFilterItem: (filterItem: positionsUiType) => void }) {
    const [selectedPlayer, setSelectedPlayer] = useRecoilState(selectedPlayerState)

    function getClassName() {
        const staticClassName = 'players-list-row-div exactly-players '

        if (selectedPlayer !== undefined && selectedPlayer.id === player.id)
            return staticClassName + 'players-list-row-div-selected'
        else
            return staticClassName
    }

    function getPlayerRowOnCLick() {
        if (selectedPlayer !== undefined && selectedPlayer.id === player.id)
            setSelectedPlayer(undefined)
        else {
            setSelectedPlayer(player)
            setSelectedPositionBySelectedFilterItem(player.position)
        }
    }

    return (
        <div className={getClassName()} onClick={getPlayerRowOnCLick}>
            <div className={'column-of-names-info'}>
                <div className={'choose-player-name'}>{player.webName}</div>
                <div className={'choose-player-team-name'}>{player.team}</div>
                <div className={'choose-player-team-name'}>{player.position}</div>
            </div>
            <div className={'choose-player-info'}>{toFarsiNumber(player.playerWeekLog.playerTotalPoints)}</div>
            <div className={'choose-player-info'}>{toFarsiNumber(player.playerWeekLog.playerCost)}</div>
        </div>
    )
}