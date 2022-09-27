import {attPositions, defPositions, gkPositions, midPositions, toFarsiNumber} from "../../../../../global/Variables";
import './TransfersSideListPlayer.css'
import React from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {selectedPlayerState} from "../../../transfers/sideList/TransfersSideList";
import {playerType, positionsUiType} from "../../../../../global/Types";
import {selectedPositionState} from "../../../transfers/schematic/Schematic";
import {myPlayersState} from "../../../transfers/Transfers";

export function TransfersSideListPlayer({player}: { player: playerType }) {
    const [selectedPlayer, setSelectedPlayer] = useRecoilState(selectedPlayerState)
    const [selectedPosition, setSelectedPosition] = useRecoilState(selectedPositionState)
    const myPlayers = useRecoilValue(myPlayersState)

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

    function setSelectedPositionBySelectedFilterItem(filterItem: positionsUiType) {
        function isSelectedPositionInArray(positions: number[]) {
            if (selectedPosition)
                return positions.includes(selectedPosition)
            else
                return false
        }

        function getFirstEmptyPosition(positions: number[]) {
            for (let i = 0; i < positions.length; i++) {
                if (myPlayers[positions[i]] === undefined)
                    return positions[i]
            }

            return positions[0]
        }

        if (filterItem === 'ALL' && !selectedPosition)
            setSelectedPosition(undefined)
        else if (filterItem === 'GK' && !isSelectedPositionInArray(gkPositions))
            setSelectedPosition(getFirstEmptyPosition(gkPositions))
        else if (filterItem === 'DEF' && !isSelectedPositionInArray(defPositions))
            setSelectedPosition(getFirstEmptyPosition(defPositions))
        else if (filterItem === 'MID' && !isSelectedPositionInArray(midPositions))
            setSelectedPosition(getFirstEmptyPosition(midPositions))
        else if (filterItem === 'ATT' && !isSelectedPositionInArray(attPositions))
            setSelectedPosition(getFirstEmptyPosition(attPositions))
    }

    return (
        <div className={getClassName()} onClick={getPlayerRowOnCLick}>
            <div className={'column-of-names-info'}>
                <div className={'choose-player-name'}>{player.webName}</div>
                <div className={'choose-player-team-name'}>{player.team}</div>
                <div className={'choose-player-team-name'}>{player.position}</div>
            </div>
            <div
                className={'choose-player-info'}>{toFarsiNumber(player.playerWeekLog.playerTotalPoints)}</div>
            <div className={'choose-player-info'}>{toFarsiNumber(player.playerWeekLog.playerCost)}</div>
        </div>
    )
}