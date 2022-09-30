import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import './TransfersMyListPlayer.css';
import {myPlayersState} from "../../../transfers/Transfers";
import {removePlayerModalDisplayState} from "../../../transfers/removePlayerModal/RemovePlayerModal";
import {selectedPlayerState} from "../../../transfers/sideList/TransfersSideList";
import React, {useRef} from "react";
import {
    toFarsiNumber,
    transfersAttPositions,
    transfersDefPositions,
    transfersGkPositions,
    transfersMidPositions
} from "../../../../../global/Variables";
import {playerType} from "../../../../../global/Types";
import {focusOnElementByRef, handleKeyboardEvent} from "../../../../../global/functions/General";
import deleteIcon from "../../../transfers/myList/assets/delete-icon.svg";
import activeCloth from "../../../assets/active-cloth.svg";
import inactiveCloth from "../../../assets/inactive-cloth.svg";
import {transfersSelectedPositionState} from "../schematic/TransfersSchematicPlayer";

export function TransfersMyListPlayer({position}: { position?: number }) {
    const myPlayers = useRecoilValue(myPlayersState)
    const [transfersSelectedPosition, setTransfersSelectedPosition] = useRecoilState(transfersSelectedPositionState)
    const setRemovePlayerModalDisplay = useSetRecoilState(removePlayerModalDisplayState)
    const setSelectedPlayer = useSetRecoilState(selectedPlayerState)

    const selectedRowDivRef = useRef<HTMLDivElement | null>(null)
    const keyboardKeys = ['ArrowDown', 'ArrowUp'] as const

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

        function handleArrowUpKey(transfersSelectedPosition: number) {
            if (!handleArrowUpKeyEachArray(transfersSelectedPosition, transfersGkPositions) &&
                !handleArrowUpKeyEachArray(transfersSelectedPosition, transfersDefPositions) &&
                !handleArrowUpKeyEachArray(transfersSelectedPosition, transfersMidPositions) &&
                !handleArrowUpKeyEachArray(transfersSelectedPosition, transfersAttPositions)
            )
                setTransfersSelectedPosition(transfersSelectedPosition - 1)
        }

        function handleArrowUpKeyEachArray(transfersSelectedPosition: number, array: Array<number>): boolean {
            if (transfersSelectedPosition === array[0]) {
                setTransfersSelectedPosition(getBeforeNextPositionArrays(transfersSelectedPosition)[0].at(-1))
                return true
            } else if (transfersSelectedPosition === array.at(-1)) {
                setTransfersSelectedPosition(array.at(-2))
                return true
            }

            return false
        }

        function handleArrowDownKey(transfersSelectedPosition: number) {
            if (!handleArrowLeftKeyEachArray(transfersSelectedPosition, transfersGkPositions) &&
                !handleArrowLeftKeyEachArray(transfersSelectedPosition, transfersDefPositions) &&
                !handleArrowLeftKeyEachArray(transfersSelectedPosition, transfersMidPositions) &&
                !handleArrowLeftKeyEachArray(transfersSelectedPosition, transfersAttPositions)
            )
                setTransfersSelectedPosition(transfersSelectedPosition + 1)
        }

        function handleArrowLeftKeyEachArray(transfersSelectedPosition: number, array: Array<number>): boolean {
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
                if (arrowKey === 'ArrowUp')
                    handleArrowUpKey(transfersSelectedPosition)
                else if (arrowKey === 'ArrowDown')
                    handleArrowDownKey(transfersSelectedPosition)
            }
        }
    }

    function getInfoSectionPlayer() {
        return (
            <div className={'div-my-players-info-list'}>
                <img id={'delete-icon-players-list'} src={deleteIcon} alt={'active player'}
                     style={{visibility: (transfersSelectedPosition && myPlayers[transfersSelectedPosition] ? 'visible' : 'hidden')}}
                     onClick={deletePlayer()}/>
                <img className={'cloth-my-players-list'}
                     src={transfersSelectedPosition ? (myPlayers[transfersSelectedPosition] ? activeCloth : inactiveCloth) : inactiveCloth}
                     alt={'specific cloth of players'}/>
            </div>
        )
    }

    function getActive(player: playerType): JSX.Element {
        return (
            <div className='row-div'
                 onClick={() => setTransfersSelectedPosition(player.locationInTransferUI)}>
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
                 onClick={() => setTransfersSelectedPosition(position)}>
                <div className='row-name inactive-row-name'>none</div>
                <div className='row-number inactive-row-number'>۰</div>
                <div className='row-number inactive-row-number'>۰</div>
            </div>
        )
    }

    function getSelectedInactive(): JSX.Element {
        return (
            <div className='row-div selected-row-div'
                 onClick={() => setTransfersSelectedPosition(undefined)} ref={focusOnElementByRef(selectedRowDivRef)}
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
                 onClick={() => setTransfersSelectedPosition(undefined)} ref={focusOnElementByRef(selectedRowDivRef)}
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
            if (!transfersSelectedPosition || !myPlayers[transfersSelectedPosition])
                return

            setTransfersSelectedPosition(myPlayers[transfersSelectedPosition].locationInTransferUI)
            setSelectedPlayer(undefined)
            setRemovePlayerModalDisplay('block')
        }
    }

    return (
        !position ? getInfoSectionPlayer() :
            (transfersSelectedPosition && transfersSelectedPosition === position ?
                myPlayers[position] ? getSelectedActive(myPlayers[position]) : getSelectedInactive() :
                myPlayers[position] ? getActive(myPlayers[position]) : getInactive(position))
    )
}