import React, {useRef} from "react";
import './TransfersSchematicPlayer.css'
import {attPositions, defPositions, gkPositions, midPositions, toFarsiNumber} from "../../../../../global/Variables";
import {playerType} from "../../../../../global/Types";
import deleteIcon from "../../../transfers/schematic/assets/delete-icon.svg";
import activeCloth from "../../../transfers/schematic/assets/active-cloth.svg";
import inactiveCloth from "../../../transfers/schematic/assets/inactive-cloth.svg";
import addIcon from "../../../transfers/schematic/assets/add-icon.svg";
import {focusOnElementByRef, handleKeyboardEvent} from "../../../../../global/Functions";
import selectedCloth from "../../../transfers/schematic/assets/selected-cloth.svg";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {myPlayersState} from "../../../transfers/Transfers";
import {selectedPositionState} from "../../../transfers/schematic/Schematic";
import {removePlayerModalDisplayState} from "../../../transfers/removePlayerModal/RemovePlayerModal";
import {selectedPlayerState} from "../../../transfers/sideList/TransfersSideList";

export function TransfersSchematicPlayer({position}: { position: number }) {
    const myPlayers = useRecoilValue(myPlayersState)
    const [selectedPosition, setSelectedPosition] = useRecoilState(selectedPositionState)
    const setRemovePlayerModalDisplay = useSetRecoilState(removePlayerModalDisplayState)
    const setSelectedPlayer = useSetRecoilState(selectedPlayerState)

    const selectedDivRef = useRef<HTMLDivElement | null>(null)
    const keyboardKeys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'] as const

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

        function handleArrowLeftKey(selectedPosition: number) {
            if (!handleArrowLeftKeyEachArray(selectedPosition, gkPositions) &&
                !handleArrowLeftKeyEachArray(selectedPosition, defPositions) &&
                !handleArrowLeftKeyEachArray(selectedPosition, midPositions) &&
                !handleArrowLeftKeyEachArray(selectedPosition, attPositions)
            )
                setSelectedPosition(selectedPosition - 1)
        }

        function handleArrowLeftKeyEachArray(selectedPosition: number, array: Array<number>): boolean {
            if (selectedPosition === array[0]) {
                setSelectedPosition(getBeforeNextPositionArrays(selectedPosition)[0].at(-1))
                return true
            } else if (selectedPosition === array.at(-1)) {
                setSelectedPosition(array.at(-2))
                return true
            }

            return false
        }

        function handleArrowRightKey(selectedPosition: number) {
            if (!handleArrowRightKeyEachArray(selectedPosition, gkPositions) &&
                !handleArrowRightKeyEachArray(selectedPosition, defPositions) &&
                !handleArrowRightKeyEachArray(selectedPosition, midPositions) &&
                !handleArrowRightKeyEachArray(selectedPosition, attPositions)
            )
                setSelectedPosition(selectedPosition + 1)
        }

        function handleArrowRightKeyEachArray(selectedPosition: number, array: Array<number>): boolean {
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
                if (arrowKey === 'ArrowLeft')
                    handleArrowLeftKey(selectedPosition)
                else if (arrowKey === 'ArrowRight')
                    handleArrowRightKey(selectedPosition)
                else if (arrowKey === 'ArrowUp')
                    setSelectedPosition(getBeforeNextPositionArrays(selectedPosition)[0][0])
                else if (arrowKey === 'ArrowDown')
                    setSelectedPosition(getBeforeNextPositionArrays(selectedPosition)[1][0])
            }
        }
    }

    function getActive(player: playerType): JSX.Element {
        return (
            <div className='schematic-cloth-div'>
                <img className={'delete-icon'} src={deleteIcon} alt={'delete icon'}
                     onClick={deletePlayer(player)}/>
                <img className={'schematic-cloth'} src={activeCloth} alt={'active player'}
                     onClick={() => setSelectedPosition(player.locationInTransferUI)}/>
                <div className={'player-name'}>{player.webName}</div>
                <div className={'power'}>{toFarsiNumber(player.playerWeekLog.playerTotalPoints)}</div>
            </div>
        )
    }

    function deletePlayer(player: playerType) {
        return () => {
            setSelectedPosition(player.locationInTransferUI)
            setSelectedPlayer(undefined)
            setRemovePlayerModalDisplay('block')
        }
    }

    function getInactive(position: number): JSX.Element {
        return (
            <div className='schematic-cloth-div inactive-cloth-div'>
                <img className={'delete-icon'} src={deleteIcon} alt={'delete icon'}
                     style={{visibility: 'hidden'}}/>
                <img className={'schematic-cloth'} src={inactiveCloth} alt={'inactive player'}
                     onClick={() => setSelectedPosition(position)}/>
                <img className={'add-icon'} src={addIcon} alt={'add icon'}
                     onClick={() => setSelectedPosition(position)}/>
                <div className={'player-name'} style={{visibility: 'hidden'}}>dummy</div>
                <div className={'power'} style={{visibility: 'hidden'}}>۰</div>
            </div>
        )
    }

    function getSelectedInactive(): JSX.Element {
        return (
            <div className='schematic-cloth-div selected-cloth-div' ref={focusOnElementByRef(selectedDivRef)}
                 tabIndex={0}
                 onKeyUp={
                     handleKeyboardEvent(keyboardKeys, keyboardKeys.map(key => handleArrowKey(key))
                     )}>
                <img className={'delete-icon'} src={deleteIcon} alt={'delete icon'}
                     style={{visibility: 'hidden'}}/>
                <img className={'schematic-cloth'} src={selectedCloth} alt={'selected player'}
                     onClick={() => setSelectedPosition(undefined)}/>
                <div className={'player-name'} style={{visibility: 'hidden'}}>dummy</div>
                <div className={'power'} style={{visibility: 'hidden'}}>۰</div>
            </div>
        )
    }

    function getSelectedActive(player: playerType): JSX.Element {
        return (
            <div className='schematic-cloth-div selected-cloth-div' ref={focusOnElementByRef(selectedDivRef)}
                 tabIndex={0}
                 onKeyUp={
                     handleKeyboardEvent([...keyboardKeys, 'Backspace'], [...keyboardKeys.map(key => handleArrowKey(key)), () => deletePlayer(player)()]
                     )}>
                <img className={'delete-icon'} src={deleteIcon} alt={'delete icon'}
                     onClick={deletePlayer(player)}/>
                <img className={'schematic-cloth'} src={selectedCloth} alt={'selected player'}
                     onClick={() => setSelectedPosition(undefined)}/>
                <div className={'player-name'}>{player.webName}</div>
                <div className={'power'}>{toFarsiNumber(player.playerWeekLog.playerTotalPoints)}</div>
            </div>
        )
    }

    return (
        selectedPosition && selectedPosition === position ?
            myPlayers[position] ? getSelectedActive(myPlayers[position]) : getSelectedInactive() :
            myPlayers[position] ? getActive(myPlayers[position]) : getInactive(position)
    )
}