import React, {useEffect, useRef} from "react";
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
import {focusOnElementByRef, handleKeyboardEvent} from "../../../../global/Functions";

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

    // for keyboard keys
    const selectedRowDivRef = useRef<HTMLDivElement | null>(null)
    const firstPosition = 1
    const lastPosition = 15

    useEffect(() => {
        if (selectedPosition === undefined)
            setSelectedPlayer(undefined)
        else {
            if (gkPositions.includes(selectedPosition))
                setSelectedFilterItem('GK')
            else if (defPositions.includes(selectedPosition))
                setSelectedFilterItem('DEF')
            else if (midPositions.includes(selectedPosition))
                setSelectedFilterItem('MID')
            else if (attPositions.includes(selectedPosition))
                setSelectedFilterItem('ATT')
        }
    }, [selectedPosition])

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
        const keyboardKeys = ['ArrowDown', 'ArrowUp'] as const

        function handleArrowKey(ArrowKey: typeof keyboardKeys[number]) {
            return () => {
                if (selectedPosition) {
                    if (selectedPosition === firstPosition && ArrowKey === 'ArrowUp')
                        selectPosition(lastPosition)()
                    else if (selectedPosition === lastPosition && ArrowKey === 'ArrowDown')
                        selectPosition(firstPosition)()
                    else
                        selectPosition(ArrowKey === 'ArrowDown' ? selectedPosition + 1 : selectedPosition - 1)()
                }
            }
        }

        function getActiveRowDiv(player: playerType): JSX.Element {
            return (
                <div className='row-div' style={{gridRowStart: position + offsetInUi}}
                     onClick={selectPosition(position)}>
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
                     onClick={selectPosition(position)}>
                    <text className='row-name inactive-row-name'>none</text>
                    <text className='row-number inactive-row-number'>۰</text>
                    <text className='row-number inactive-row-number'>۰</text>
                </div>
            )
        }

        function getSelectedInactiveRowDiv(): JSX.Element {
            return (
                <div className='row-div selected-row-div' style={{gridRowStart: position + offsetInUi}}
                     onClick={deselectPosition} ref={focusOnElementByRef(selectedRowDivRef)} tabIndex={0}
                     onKeyUp={
                         handleKeyboardEvent(keyboardKeys, keyboardKeys.map(key => handleArrowKey(key))
                         )}>
                    <text className='row-name inactive-row-name'>none</text>
                    <text className='row-number inactive-row-number'>۰</text>
                    <text className='row-number inactive-row-number'>۰</text>
                </div>
            )
        }

        function getSelectedActiveRowDiv(player: playerType): JSX.Element {
            return (
                <div className='row-div selected-row-div' style={{gridRowStart: position + offsetInUi}}
                     onClick={deselectPosition} ref={focusOnElementByRef(selectedRowDivRef)} tabIndex={0}
                     onKeyUp={
                         handleKeyboardEvent([...keyboardKeys, 'Backspace'], [...keyboardKeys.map(key => handleArrowKey(key)), () => deletePlayer()()]
                         )}>
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