import React from "react";
import './MyTeamMyListPlayer.css'
import {useRecoilState, useRecoilValue} from "recoil";
import {toFarsiNumber} from "../../../../../global/Variables";
import activeCloth from "../../../assets/active-cloth.svg";
import inactiveCloth from "../../../assets/inactive-cloth.svg";
import {playerType} from "../../../../../global/Types";
import {myTeamSelectedPositionsState} from "../schematic/MyTeamSchematicPlayer";
import {myTeamPlayersState} from "../../../myTeam/MyTeam";

export function MyTeamMyListPlayer({position}: { position?: number }) {
    const myTeamPlayers = useRecoilValue(myTeamPlayersState)
    const [myTeamSelectedPositions, setMyTeamSelectedPositions] = useRecoilState(myTeamSelectedPositionsState)

    function getInfoSectionPlayer() {
        return (
            <div id={'my-team-my-list-info'} className={'div-my-players-info-list'}>
                <img className={'cloth-my-players-list'}
                     src={myTeamSelectedPositions.length ? activeCloth : inactiveCloth}
                     alt={'specific cloth of players'}/>
            </div>
        )
    }

    function getActive(player: playerType, isSelected: boolean): JSX.Element {
        return (
            <div className={'row-div' + (isSelected ? ' selected-row-div' : '')}
                 onClick={activeOnClick(player.locationInTeamUI, isSelected)}>
                <div className='row-name active-row-name'>{player.webName}</div>
                <div
                    className='row-number active-row-number'>{toFarsiNumber(player.playerWeekLog.playerTotalPoints)}</div>
                <div
                    className='row-number active-row-number'>{toFarsiNumber(player.playerWeekLog.playerCost)}</div>
            </div>
        )
    }

    function getInactive(): JSX.Element {
        return (
            <div className='row-div'>
                <div className='row-name inactive-row-name'>none</div>
                <div className='row-number inactive-row-number'>۰</div>
                <div className='row-number inactive-row-number'>۰</div>
            </div>
        )
    }

    function activeOnClick(position: number | undefined, isSelected: boolean) {
        return () => {
            if (!position)
                return

            if (isSelected)
                setMyTeamSelectedPositions([...myTeamSelectedPositions].filter(p => p !== position))
            else if (myTeamSelectedPositions.length < 2)
                setMyTeamSelectedPositions([...myTeamSelectedPositions, position])
            else if (myTeamSelectedPositions.length === 2)
                setMyTeamSelectedPositions([myTeamSelectedPositions[0], position])
        }
    }

    return (
        !position ? getInfoSectionPlayer() :
            (myTeamPlayers[position] ?
                myTeamSelectedPositions.includes(position) ? getActive(myTeamPlayers[position], true) :
                    getActive(myTeamPlayers[position], false)
                : getInactive())
    )
}