import React, {useEffect, useRef} from 'react';
import './RemovePlayerModal.css';
import activeCloth from '../schematic/assets/active-cloth.svg';
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {selectedPositionState} from "../schematic/Schematic";
import {myPlayersState} from "../Transfers";
import {clickOnElement, focusOnElementByRef, handleKeyboardEvent} from "../../../../global/functions/General";
import {selectedPlayerState} from "../sideList/TransfersSideList";

export const isDeleteConfirmClickedState = atom<boolean>({
    key: 'isDeleteConfirmClickedState',
    default: false
})

export const removePlayerModalDisplayState = atom<'none' | 'block'>({
    key: 'removePlayerModalDisplayState',
    default: 'none'
})

export function RemovePlayerModal() {
    const myPlayers = useRecoilValue(myPlayersState)
    const selectedPosition = useRecoilValue(selectedPositionState)
    const setSelectedPlayer = useSetRecoilState(selectedPlayerState)
    const setIsDeleteConfirmClicked = useSetRecoilState(isDeleteConfirmClickedState)
    const [removePlayerModalDisplay, setRemovePlayerModalDisplay] = useRecoilState(removePlayerModalDisplayState)

    const deleteModalDivRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (removePlayerModalDisplay === 'none')
            setIsDeleteConfirmClicked(false)
    }, [removePlayerModalDisplay])

    function getActionsSection(selectedPosition: number) {
        return <div>
            <div id={'text'}>{getText(selectedPosition)}</div>
            <div id={'buttons-container'}>
                <button id={'delete-button'} onClick={() => setIsDeleteConfirmClicked(true)}>
                    حذف
                </button>
                <button id={'cancel-button'} onClick={cancelOnClick}>لغو</button>
            </div>
        </div>
    }

    function getText(selectedPosition: number) {
        return myPlayers[selectedPosition] ? 'آیا از حذف ' +
            myPlayers[selectedPosition].webName +
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
            {selectedPosition ? getActionsSection(selectedPosition) : closeModal()}
        </div>
    )
}
