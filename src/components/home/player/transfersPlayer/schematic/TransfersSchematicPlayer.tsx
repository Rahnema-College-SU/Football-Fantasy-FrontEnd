import React, {useRef} from "react";
import './TransfersSchematicPlayer.css'
import {transfersAttPositions, transfersDefPositions, transfersGkPositions, transfersMidPositions, toFarsiNumber} from "../../../../../global/Variables";
import {playerType} from "../../../../../global/Types";
import deleteIcon from "../../../transfers/schematic/assets/delete-icon.svg";
import activeCloth from "../../../assets/active-cloth.svg";
import inactiveCloth from "../../../assets/inactive-cloth.svg";
import addIcon from "../../../transfers/schematic/assets/add-icon.svg";
import {focusOnElementByRef, handleKeyboardEvent} from "../../../../../global/functions/General";
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
            if (transfersGkPositions.includes(position))
                return [transfersAttPositions, transfersDefPositions]
            else if (transfersDefPositions.includes(position))
                return [transfersGkPositions, transfersMidPositions]
            else if (transfersMidPositions.includes(position))
                return [transfersDefPositions, transfersAttPositions]
            else if (transfersAttPositions.includes(position))
                return [transfersMidPositions, transfersGkPositions]
            else
                return [[], []]
        }

        function handleArrowLeftKey(selectedPosition: number) {
            if (!handleArrowLeftKeyEachArray(selectedPosition, transfersGkPositions) &&
                !handleArrowLeftKeyEachArray(selectedPosition, transfersDefPositions) &&
                !handleArrowLeftKeyEachArray(selectedPosition, transfersMidPositions) &&
                !handleArrowLeftKeyEachArray(selectedPosition, transfersAttPositions)
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
            if (!handleArrowRightKeyEachArray(selectedPosition, transfersGkPositions) &&
                !handleArrowRightKeyEachArray(selectedPosition, transfersDefPositions) &&
                !handleArrowRightKeyEachArray(selectedPosition, transfersMidPositions) &&
                !handleArrowRightKeyEachArray(selectedPosition, transfersAttPositions)
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

    function getInactive(position: number): JSX.Element {
        return (
            <div className='schematic-cloth-div inactive-cloth-div'>
                <img className={'delete-icon'} src={deleteIcon} alt={'delete icon'}
                     style={{visibility: 'hidden'}}/>
                <img className={'schematic-cloth'} src={inactiveCloth} alt={'inactive player'}
                     onClick={() => setSelectedPosition(position)}/>
                <img className={'add-icon'} src={addIcon} alt={'add icon'}
                     onClick={() => setSelectedPosition(position)}/>
                <div className={'player-name'} style={{visibility: 'hidden'}}>fake</div>
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
                <div className={'player-name'} style={{visibility: 'hidden'}}>fake</div>
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

    function deletePlayer(player: playerType) {
        return () => {
            setSelectedPosition(player.locationInTransferUI)
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