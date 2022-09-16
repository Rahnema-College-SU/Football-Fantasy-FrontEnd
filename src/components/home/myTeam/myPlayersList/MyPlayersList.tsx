import React from "react";
import './MyPlayersList.css';
import {useRecoilValue, useSetRecoilState} from "recoil";
import {myPlayersState} from "../MyTeam";
import {selectedPositionState} from "../ground/Ground";
import activeCloth from './assets/active-cloth.svg'
import inactiveCloth from './assets/inactive-cloth.svg'
import logo from './assets/logo.svg';
import curveLines from './assets/curve-lines.svg';
import {attPositions, defPositions, gkPositions, midPositions, toFarsiNumber} from "../../../../global/Variables";
import {playerType} from "../../../../global/Types";
import deleteIcon from "./assets/delete-icon.svg";
import {removePlayerModalDisplayState} from "../removePlayerModal/RemovePlayerModal";
import {selectedFilterItemState, selectedPlayerState} from "../choosePlayerList/ChoosePlayerList";

function MyPlayersList({
                           selectPosition,
                           deselectPosition
                       }: {
    selectPosition: (position: number | undefined) => () => void,
    deselectPosition: () => void
}) {
    const myPlayers = useRecoilValue(myPlayersState)
    const selectedPosition = useRecoilValue(selectedPositionState)
    const setRemovePlayerModalDisplay = useSetRecoilState(removePlayerModalDisplayState)
    const setSelectedFilterItem = useSetRecoilState(selectedFilterItemState)
    const setSelectedPlayer = useSetRecoilState(selectedPlayerState)

    function getInfoDiv(): JSX.Element {
        return <div id={'info-div'}>
            <div id={'div-my-players-info-list'}>
                <img id={'delete-icon-players-list'} src={deleteIcon} alt={'active cloth'}
                     style={{visibility: (selectedPosition && myPlayers[selectedPosition] ? 'visible' : 'hidden')}}
                     onClick={deletePlayer()}/>
                <img id={'cloth-my-players-list'}
                     src={selectedPosition ? (myPlayers[selectedPosition] ? activeCloth : inactiveCloth) : inactiveCloth}
                     alt={'specific cloth of players'}/>
            </div>
            <img id={'logo-my-players-list'} src={logo} alt={'logo of premier league'}/>
            <div id={'info-name'}>
                {selectedPosition && myPlayers[selectedPosition] ? myPlayers[selectedPosition].web_name : 'none'}
            </div>
            <img id={'curve-lines-my-players-list'} src={curveLines} alt={"curve lines it's somehow the second logo"}/>
        </div>
    }

    function deletePlayer() {
        return () => {
            if (!selectedPosition || !myPlayers[selectedPosition])
                return

            selectPosition(myPlayers[selectedPosition].location_in_ui)()
            setSelectedPlayer(undefined)
            setRemovePlayerModalDisplay('block')
        }
    }

    function getRowDiv(position: number, offsetInUi: number) {
        function activeInactiveOnClick(position: number | undefined) {
            return () => {
                selectPosition(position)()

                if (position === undefined)
                    setSelectedPlayer(undefined)
                else if (gkPositions.includes(position))
                    setSelectedFilterItem('GK')
                else if (defPositions.includes(position))
                    setSelectedFilterItem('DEF')
                else if (midPositions.includes(position))
                    setSelectedFilterItem('MID')
                else if (attPositions.includes(position))
                    setSelectedFilterItem('ATT')
            }
        }

        function getActiveRowDiv(player: playerType): JSX.Element {
            return (
                <div className='row-div' style={{gridRowStart: position + offsetInUi}}
                     onClick={activeInactiveOnClick(position)}>
                    <text className='row-name active-row-name'>{player.web_name}</text>
                    <text
                        className='row-number active-row-number'>{toFarsiNumber(player.player_week_log.player_total_points)}</text>
                    <text
                        className='row-number active-row-number'>{toFarsiNumber(player.player_week_log.player_cost)}</text>
                </div>
            )
        }

        function getInactiveRowDiv(position: number): JSX.Element {
            return (
                <div className='row-div' style={{gridRowStart: position + offsetInUi}}
                     onClick={activeInactiveOnClick(position)}>
                    <text className='row-name inactive-row-name'>none</text>
                    <text className='row-number inactive-row-number'>۰</text>
                    <text className='row-number inactive-row-number'>۰</text>
                </div>
            )
        }

        function getSelectedInactiveRowDiv(): JSX.Element {
            return (
                <div className='row-div selected-row-div' style={{gridRowStart: position + offsetInUi}}
                     onClick={deselectPosition}>
                    <text className='row-name inactive-row-name'>none</text>
                    <text className='row-number inactive-row-number'>۰</text>
                    <text className='row-number inactive-row-number'>۰</text>
                </div>
            )
        }

        function getSelectedActiveRowDiv(player: playerType): JSX.Element {
            return (
                <div className='row-div selected-row-div' style={{gridRowStart: position + offsetInUi}}
                     onClick={deselectPosition}>
                    <text className='row-name active-row-name'>{player.web_name}</text>
                    <text
                        className='row-number active-row-number'>{toFarsiNumber(player.player_week_log.player_total_points)}</text>
                    <text
                        className='row-number active-row-number'>{toFarsiNumber(player.player_week_log.player_cost)}</text>
                </div>
            )
        }

        return (
            (selectedPosition && selectedPosition === position) ? (
                myPlayers[position] ? getSelectedActiveRowDiv(myPlayers[position]) : getSelectedInactiveRowDiv()
            ) : (
                myPlayers[position] ? getActiveRowDiv(myPlayers[position]) : getInactiveRowDiv(position)
            )
        )
    }

    function getEahPositionRow(positions: number[], offsetInUi: number): JSX.Element[] {
        return positions.map(position => {
            return getRowDiv(position, offsetInUi)
        })
    }

    function getPlayersRow(): JSX.Element {
        return <div id={'players-div'}>
            <div id={'point'}>عملکرد</div>
            <div id={'price'}>قیمت</div>
            <div id={'first-divider'}></div>

            <div className={'header-div gk-header-div'}>دروازه‌بانان</div>
            {getEahPositionRow(gkPositions, 2)}

            <div className={'header-div def-header-div'}>مدافعان</div>
            {getEahPositionRow(defPositions, 3)}

            <div className={'header-div mid-header-div'}>هافبک‌ها</div>
            {getEahPositionRow(midPositions, 4)}

            <div className={'header-div att-header-div'}>مهاجمین</div>
            {getEahPositionRow(attPositions, 5)}
        </div>
    }

    return (
        <div id={'my-players-list'}>
            {getInfoDiv()}
            {getPlayersRow()}
        </div>
    )
}

export default MyPlayersList;