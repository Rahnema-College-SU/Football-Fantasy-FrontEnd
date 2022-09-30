import React from "react";
import './MyTeamSchematicPlayer.css'
import {atom, useRecoilState, useRecoilValue} from "recoil";
import activeCloth from "../../../assets/active-cloth.svg";
import inactiveCloth from "../../../assets/inactive-cloth.svg";
import substitute from './assets/substitute.svg'
import {playerType} from "../../../../../global/Types";
import {myTeamPlayersState} from "../../../myTeam/MyTeam";

export const myTeamSelectedPositionsState = atom<number[]>({
    key: 'selectedPositionsState',
    default: []
})

export function MyTeamSchematicPlayer({position}: { position: number }) {
    const myTeamPlayers = useRecoilValue(myTeamPlayersState)
    const [myTeamSelectedPositions, setMyTeamSelectedPositions] = useRecoilState(myTeamSelectedPositionsState)

    function isPLayerSelected() {
        return myTeamSelectedPositions.includes(position)
    }

    function getActive(player: playerType, isSelected: boolean) {
        function activeOnClick() {
            if (isPLayerSelected())
                setMyTeamSelectedPositions([...myTeamSelectedPositions].filter(p => p !== position))
            else if (myTeamSelectedPositions.length < 2)
                setMyTeamSelectedPositions([...myTeamSelectedPositions, position])
            else if (myTeamSelectedPositions.length === 2)
                setMyTeamSelectedPositions([myTeamSelectedPositions[0], position])
        }

        return (
            <div className={'my-team-schematic-active-div' + (isSelected ? ' selected-cloth-div' : '')}>
                <div className={'cloth-icon-container'}>
                    <img className={'my-team-schematic-cloth my-team-active'} src={activeCloth}
                         alt={'active my team player'}
                         onClick={activeOnClick}/>
                    <img className={'substitute-icon'} src={substitute}
                         alt={'substitute icon, just an image, do not work'} onClick={activeOnClick}/>
                </div>
                <div
                    className={'my-team-player-name' + (isSelected ? ' my-team-schematic-player-name-selected' : '')}>
                    {player.webName}
                </div>
            </div>
        )
    }

    function getInactive() {
        return (
            <div className={'my-team-schematic-inactive-div'}>
                <img className={'my-team-schematic-cloth'} src={inactiveCloth} alt={'inactive my team player'}/>
                <div style={{visibility: 'hidden'}}>fake</div>
            </div>
        )
    }

    return (
        myTeamPlayers[position] ?
            (isPLayerSelected()) ?
                getActive(myTeamPlayers[position], true) : getActive(myTeamPlayers[position], false)
            :
            getInactive()
    )
}