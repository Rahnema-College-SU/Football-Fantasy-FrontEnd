import React, {useEffect, useRef} from "react";
import './MyPlayersList.css';
import {useRecoilValue, useSetRecoilState} from "recoil";
import {myPlayersState} from "../Transfers";
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

    const selectedRowDivRef = useRef<HTMLDivElement | null>(null)

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
                <img id={'delete-icon-players-list'} src={deleteIcon} alt={'active player'}
                     style={{visibility: (selectedPosition && myPlayers[selectedPosition] ? 'visible' : 'hidden')}}
                     onClick={deletePlayer()}/>
                <img id={'cloth-my-players-list'}
                     src={selectedPosition ? (myPlayers[selectedPosition] ? activeCloth : inactiveCloth) : inactiveCloth}
                     alt={'specific player of players'}/>
            </div>
            <img id={'logo-my-players-list'} src={logo} alt={'logo of premier league'}/>
            <div id={'info-name'}>
                {selectedPosition && myPlayers[selectedPosition] ? myPlayers[selectedPosition].webName : 'none'}
            </div>
            <img id={'curve-lines-my-players-list'} src={curveLines} alt={"curve lines it's somehow the second logo"}/>
        </div>
    }

    function deletePlayer() {
        return () => {
            if (!selectedPosition || !myPlayers[selectedPosition])
                return

            selectPosition(myPlayers[selectedPosition].locationInTransferUI)()
            setSelectedPlayer(undefined)
            setRemovePlayerModalDisplay('block')
        }
    }

    function getRowDiv(position: number) {
        const keyboardKeys = ['ArrowDown', 'ArrowUp'] as const

        function handleArrowKey(arrowKey: typeof keyboardKeys[number]) {
            function getBeforeNextPositionArrays(position: number): [Array<number>, Array<number>] {
                // selected position must be between 1 and 15
                if (gkPositions.includes(position))
                    return [attPositions, defPositions]
                else if (defPositions.includes(position))
                    return [gkPositions, midPositions]
                else if (midPositions.includes(position))
                    return [defPositions, attPositions]
                else if (attPositions.includes(position))
                    return [midPositions, gkPositions]
                else
                    return [[], []]
            }

            function handleArrowUpKey(selectedPosition: number) {
                if (!handleArrowUpKeyEachArray(selectedPosition, gkPositions) &&
                    !handleArrowUpKeyEachArray(selectedPosition, defPositions) &&
                    !handleArrowUpKeyEachArray(selectedPosition, midPositions) &&
                    !handleArrowUpKeyEachArray(selectedPosition, attPositions)
                )
                    selectPosition(selectedPosition - 1)()
            }

            function handleArrowUpKeyEachArray(selectedPosition: number, array: Array<number>): boolean {
                if (selectedPosition === array[0]) {
                    selectPosition(getBeforeNextPositionArrays(selectedPosition)[0].at(-1))()
                    return true
                } else if (selectedPosition === array.at(-1)) {
                    selectPosition(array.at(-2))()
                    return true
                }

                return false
            }

            function handleArrowDownKey(selectedPosition: number) {
                if (!handleArrowLeftKeyEachArray(selectedPosition, gkPositions) &&
                    !handleArrowLeftKeyEachArray(selectedPosition, defPositions) &&
                    !handleArrowLeftKeyEachArray(selectedPosition, midPositions) &&
                    !handleArrowLeftKeyEachArray(selectedPosition, attPositions)
                )
                    selectPosition(selectedPosition + 1)()
            }

            function handleArrowLeftKeyEachArray(selectedPosition: number, array: Array<number>): boolean {
                if (selectedPosition === array.at(-2)) {
                    selectPosition(array.at(-1))()
                    return true
                } else if (selectedPosition === array.at(-1)) {
                    selectPosition(getBeforeNextPositionArrays(selectedPosition)[1][0])()
                    return true
                }

                return false
            }

            return () => {
                if (selectedPosition) {
                    if (arrowKey === 'ArrowUp')
                        handleArrowUpKey(selectedPosition)
                    else if (arrowKey === 'ArrowDown')
                        handleArrowDownKey(selectedPosition)
                }
            }
        }

        function getActiveRowDiv(player: playerType): JSX.Element {
            return (
                <div className='row-div'
                     onClick={selectPosition(position)}>
                    <div className='row-name active-row-name'>{player.webName}</div>
                    <div
                        className='row-number active-row-number'>{toFarsiNumber(player.playerWeekLog.playerTotalPoints)}</div>
                    <div
                        className='row-number active-row-number'>{toFarsiNumber(player.playerWeekLog.playerCost)}</div>
                </div>
            )
        }

        function getInactiveRowDiv(position: number): JSX.Element {
            return (
                <div className='row-div'
                     onClick={selectPosition(position)}>
                    <div className='row-name inactive-row-name'>none</div>
                    <div className='row-number inactive-row-number'>۰</div>
                    <div className='row-number inactive-row-number'>۰</div>
                </div>
            )
        }

        function getSelectedInactiveRowDiv(): JSX.Element {
            return (
                <div className='row-div selected-row-div'
                     onClick={deselectPosition} ref={focusOnElementByRef(selectedRowDivRef)} tabIndex={0}
                     onKeyUp={
                         handleKeyboardEvent(keyboardKeys, keyboardKeys.map(key => handleArrowKey(key))
                         )}>
                    <div className='row-name inactive-row-name'>none</div>
                    <div className='row-number inactive-row-number'>۰</div>
                    <div className='row-number inactive-row-number'>۰</div>
                </div>
            )
        }

        function getSelectedActiveRowDiv(player: playerType): JSX.Element {
            return (
                <div className='row-div selected-row-div'
                     onClick={deselectPosition} ref={focusOnElementByRef(selectedRowDivRef)} tabIndex={0}
                     onKeyUp={
                         handleKeyboardEvent([...keyboardKeys, 'Backspace'], [...keyboardKeys.map(key => handleArrowKey(key)), () => deletePlayer()()]
                         )}>
                    <div className='row-name active-row-name'>{player.webName}</div>
                    <div
                        className='row-number active-row-number'>{toFarsiNumber(player.playerWeekLog.playerTotalPoints)}</div>
                    <div
                        className='row-number active-row-number'>{toFarsiNumber(player.playerWeekLog.playerCost)}</div>
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

    function getEahPositionRow(positions: number[]): JSX.Element[] {
        return positions.map(position => {
            return getRowDiv(position)
        })
    }

    function getPlayersRow(): JSX.Element {
        return <div id={'players-div'}>
            <div id={'point'}>عملکرد</div>
            <div id={'price'}>قیمت</div>
            <div id={'first-divider'}></div>

            <div className={'header-div'}>دروازه‌بانان</div>
            {getEahPositionRow(gkPositions)}

            <div className={'header-div'}>مدافعان</div>
            {getEahPositionRow(defPositions)}

            <div className={'header-div'}>هافبک‌ها</div>
            {getEahPositionRow(midPositions)}

            <div className={'header-div'}>مهاجمین</div>
            {getEahPositionRow(attPositions)}
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