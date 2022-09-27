import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import './TransfersMyListPlayer.css';
import {myPlayersState} from "../../../transfers/Transfers";
import {selectedPositionState} from "../../../transfers/schematic/Schematic";
import {removePlayerModalDisplayState} from "../../../transfers/removePlayerModal/RemovePlayerModal";
import {selectedPlayerState} from "../../../transfers/sideList/TransfersSideList";
import React, {useRef} from "react";
import {attPositions, defPositions, gkPositions, midPositions, toFarsiNumber} from "../../../../../global/Variables";
import {playerType} from "../../../../../global/Types";
import {focusOnElementByRef, handleKeyboardEvent} from "../../../../../global/Functions";

export function TransfersMyListPlayer({position}: { position: number }) {
    const myPlayers = useRecoilValue(myPlayersState)
    const [selectedPosition, setSelectedPosition] = useRecoilState(selectedPositionState)
    const setRemovePlayerModalDisplay = useSetRecoilState(removePlayerModalDisplayState)
    const setSelectedPlayer = useSetRecoilState(selectedPlayerState)

    const selectedRowDivRef = useRef<HTMLDivElement | null>(null)
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
                setSelectedPosition(selectedPosition - 1)
        }

        function handleArrowUpKeyEachArray(selectedPosition: number, array: Array<number>): boolean {
            if (selectedPosition === array[0]) {
                setSelectedPosition(getBeforeNextPositionArrays(selectedPosition)[0].at(-1))
                return true
            } else if (selectedPosition === array.at(-1)) {
                setSelectedPosition(array.at(-2))
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
                setSelectedPosition(selectedPosition + 1)
        }

        function handleArrowLeftKeyEachArray(selectedPosition: number, array: Array<number>): boolean {
            if (selectedPosition === array.at(-2)) {
                setSelectedPosition(array.at(-1))
                return true
            } else if (selectedPosition === array.at(-1)) {
                setSelectedPosition(getBeforeNextPositionArrays(selectedPosition)[1][0])
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

    function getActive(player: playerType): JSX.Element {
        return (
            <div className='row-div'
                 onClick={() => setSelectedPosition(player.locationInTransferUI)}>
                <div className='row-name active-row-name'>{player.webName}</div>
                <div
                    className='row-number active-row-number'>{toFarsiNumber(player.playerWeekLog.playerTotalPoints)}</div>
                <div
                    className='row-number active-row-number'>{toFarsiNumber(player.playerWeekLog.playerCost)}</div>
            </div>
        )
    }

    function getInactive(position: number): JSX.Element {
        return (
            <div className='row-div'
                 onClick={() => setSelectedPosition(position)}>
                <div className='row-name inactive-row-name'>none</div>
                <div className='row-number inactive-row-number'>۰</div>
                <div className='row-number inactive-row-number'>۰</div>
            </div>
        )
    }

    function getSelectedInactive(): JSX.Element {
        return (
            <div className='row-div selected-row-div'
                 onClick={() => setSelectedPosition(undefined)} ref={focusOnElementByRef(selectedRowDivRef)}
                 tabIndex={0}
                 onKeyUp={
                     handleKeyboardEvent(keyboardKeys, keyboardKeys.map(key => handleArrowKey(key))
                     )}>
                <div className='row-name inactive-row-name'>none</div>
                <div className='row-number inactive-row-number'>۰</div>
                <div className='row-number inactive-row-number'>۰</div>
            </div>
        )
    }

    function getSelectedActive(player: playerType): JSX.Element {
        return (
            <div className='row-div selected-row-div'
                 onClick={() => setSelectedPosition(undefined)} ref={focusOnElementByRef(selectedRowDivRef)}
                 tabIndex={0}
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

    function deletePlayer() {
        return () => {
            if (!selectedPosition || !myPlayers[selectedPosition])
                return

            setSelectedPosition(myPlayers[selectedPosition].locationInTransferUI)
            setSelectedPlayer(undefined)
            setRemovePlayerModalDisplay('block')
        }
    }

    return (
        selectedPosition && selectedPosition === position ?
            myPlayers[position] ? getSelectedActive(myPlayers[position]) : getSelectedInactive() :
            myPlayers[position] ? getActive(myPlayers[position]) : getInactive(position)
    )
}