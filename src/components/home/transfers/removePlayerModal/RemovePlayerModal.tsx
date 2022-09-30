import React, {useEffect, useRef} from 'react';
import './RemovePlayerModal.css';
import activeCloth from '../../assets/active-cloth.svg';
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {transfersPlayersState} from "../Transfers";
import {clickOnElement, focusOnElementByRef, handleKeyboardEvent} from "../../../../global/functions/General";
import {selectedPlayerState} from "../sideList/TransfersSideList";
import {transfersSelectedPositionState} from "../../player/transfersPlayer/schematic/TransfersSchematicPlayer";

export const isDeleteConfirmClickedState = atom<boolean>({
    key: 'isDeleteConfirmClickedState',
    default: false
})

export const removePlayerModalDisplayState = atom<'none' | 'block'>({
    key: 'removePlayerModalDisplayState',
    default: 'none'
})

export function RemovePlayerModal() {
    const transfersPlayers = useRecoilValue(transfersPlayersState)
    const transfersSelectedPosition = useRecoilValue(transfersSelectedPositionState)
    const setSelectedPlayer = useSetRecoilState(selectedPlayerState)
    const setIsDeleteConfirmClicked = useSetRecoilState(isDeleteConfirmClickedState)
    const [removePlayerModalDisplay, setRemovePlayerModalDisplay] = useRecoilState(removePlayerModalDisplayState)

    const deleteModalDivRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (removePlayerModalDisplay === 'none')
            setIsDeleteConfirmClicked(false)
    }, [removePlayerModalDisplay])

    function getActionsSection(transfersSelectedPosition: number) {
        return <div>
            <div id={'text'}>{getText(transfersSelectedPosition)}</div>
            <div id={'buttons-container'}>
                <button id={'delete-button'} onClick={() => setIsDeleteConfirmClicked(true)}>
                    حذف
                </button>
                <button id={'cancel-button'} onClick={cancelOnClick}>لغو</button>
            </div>
        </div>
    }

    function getText(transfersSelectedPosition: number) {
        return transfersPlayers[transfersSelectedPosition] ? 'آیا از حذف ' +
            transfersPlayers[transfersSelectedPosition].webName +
            ' مطمئن هستید؟'
            :
            closeModal()
    }

    function closeModal() {
        setRemovePlayerModalDisplay('none')
        return 'Unknown Player'
    }

    function cancelOnClick() {
        setRemovePlayerModalDisplay('none')
        setSelectedPlayer(undefined)
    }

    return (
        <div ref={focusOnElementByRef(deleteModalDivRef)}
             id={'delete-modal-div'} style={{display: removePlayerModalDisplay}} tabIndex={0}
             onKeyUp={handleKeyboardEvent(['Enter', 'Escape'],
                 [clickOnElement('delete-button'), clickOnElement('cancel-button')]
             )}>
            <div id='header'>حذف بازیکن</div>
            <img id='cloth' src={activeCloth} alt={'active player'}/>
            {transfersSelectedPosition ? getActionsSection(transfersSelectedPosition) : closeModal()}
        </div>
    )
}
