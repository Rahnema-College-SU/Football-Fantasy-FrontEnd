import React, {useRef} from "react";
import './TransfersSchematicPlayer.css'
import {
    transfersAttPositions,
    transfersDefPositions,
    transfersGkPositions,
    transfersMidPositions
} from "../../../../../global/Variables";
import {playerType} from "../../../../../global/Types";
import deleteIcon from "../../../transfers/schematic/assets/delete-icon.svg";
import activeCloth from "../../../assets/active-cloth.svg";
import inactiveCloth from "../../../assets/inactive-cloth.svg";
import addIcon from "../../../transfers/schematic/assets/add-icon.svg";
import {focusOnElementByRef, handleKeyboardEvent} from "../../../../../global/functions/General";
import selectedCloth from "../../../transfers/schematic/assets/selected-cloth.svg";
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {transfersPlayersState} from "../../../transfers/Transfers";
import {removePlayerModalDisplayState} from "../../../transfers/removePlayerModal/RemovePlayerModal";
import {selectedPlayerState} from "../../../transfers/sideList/TransfersSideList";
import {toFarsiNumber} from "../../../../../global/functions/Converters";

export const transfersSelectedPositionState = atom<number | undefined>({
    key: 'selectedPositionState',
    default: undefined
})

export function TransfersSchematicPlayer({position}: { position: number }) {
    const transfersPlayers = useRecoilValue(transfersPlayersState)
    const [transfersSelectedPosition, setTransfersSelectedPosition] = useRecoilState(transfersSelectedPositionState)
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

        function handleArrowLeftKey(transfersSelectedPosition: number) {
            if (!handleArrowLeftKeyEachArray(transfersSelectedPosition, transfersGkPositions) &&
                !handleArrowLeftKeyEachArray(transfersSelectedPosition, transfersDefPositions) &&
                !handleArrowLeftKeyEachArray(transfersSelectedPosition, transfersMidPositions) &&
                !handleArrowLeftKeyEachArray(transfersSelectedPosition, transfersAttPositions)
            )
                setTransfersSelectedPosition(transfersSelectedPosition - 1)
        }

        function handleArrowLeftKeyEachArray(transfersSelectedPosition: number, array: Array<number>): boolean {
            if (transfersSelectedPosition === array[0]) {
                setTransfersSelectedPosition(getBeforeNextPositionArrays(transfersSelectedPosition)[0].at(-1))
                return true
            } else if (transfersSelectedPosition === array.at(-1)) {
                setTransfersSelectedPosition(array.at(-2))
                return true
            }

            return false
        }

        function handleArrowRightKey(transfersSelectedPosition: number) {
            if (!handleArrowRightKeyEachArray(transfersSelectedPosition, transfersGkPositions) &&
                !handleArrowRightKeyEachArray(transfersSelectedPosition, transfersDefPositions) &&
                !handleArrowRightKeyEachArray(transfersSelectedPosition, transfersMidPositions) &&
                !handleArrowRightKeyEachArray(transfersSelectedPosition, transfersAttPositions)
            )
                setTransfersSelectedPosition(transfersSelectedPosition + 1)
        }

        function handleArrowRightKeyEachArray(transfersSelectedPosition: number, array: Array<number>): boolean {
            if (transfersSelectedPosition === array.at(-2)) {
                setTransfersSelectedPosition(array.at(-1))
                return true
            } else if (transfersSelectedPosition === array.at(-1)) {
                setTransfersSelectedPosition(getBeforeNextPositionArrays(transfersSelectedPosition)[1][0])
                return true
            }

            return false
        }

        return () => {
            if (transfersSelectedPosition) {
                if (arrowKey === 'ArrowLeft')
                    handleArrowLeftKey(transfersSelectedPosition)
                else if (arrowKey === 'ArrowRight')
                    handleArrowRightKey(transfersSelectedPosition)
                else if (arrowKey === 'ArrowUp')
                    setTransfersSelectedPosition(getBeforeNextPositionArrays(transfersSelectedPosition)[0][0])
                else if (arrowKey === 'ArrowDown')
                    setTransfersSelectedPosition(getBeforeNextPositionArrays(transfersSelectedPosition)[1][0])
            }
        }
    }

    function getActive(player: playerType): JSX.Element {
        return (
            <div className='schematic-cloth-div'>
                <img className={'delete-icon'} src={deleteIcon} alt={'delete icon'}
                     onClick={deletePlayer(player)}/>
                <img className={'schematic-cloth'} src={activeCloth} alt={'active player'}
                     onClick={() => setTransfersSelectedPosition(player.locationInTransferUI)}/>
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
                     onClick={() => setTransfersSelectedPosition(position)}/>
                <img className={'add-icon'} src={addIcon} alt={'add icon'}
                     onClick={() => setTransfersSelectedPosition(position)}/>
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
                     onClick={() => setTransfersSelectedPosition(undefined)}/>
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
                     onClick={() => setTransfersSelectedPosition(undefined)}/>
                <div className={'player-name'}>{player.webName}</div>
                <div className={'power'}>{toFarsiNumber(player.playerWeekLog.playerTotalPoints)}</div>
            </div>
        )
    }

    function deletePlayer(player: playerType) {
        return () => {
            setTransfersSelectedPosition(player.locationInTransferUI)
            setSelectedPlayer(undefined)
            setRemovePlayerModalDisplay('block')
        }
    }

    return (
        transfersSelectedPosition && transfersSelectedPosition === position ?
            transfersPlayers[position] ? getSelectedActive(transfersPlayers[position]) : getSelectedInactive() :
            transfersPlayers[position] ? getActive(transfersPlayers[position]) : getInactive(position)
    )
}