import React from 'react';
import './RemovePlayerModal.css';
import activeCloth from '../ground/assets/active-cloth.svg';
import {atom, useRecoilState} from "recoil";
import {selectedPositionState} from "../ground/Ground";
import {modalsDisplayState} from "../../../../App";
import {myPlayersState} from "../MyTeam";

export const isDeleteConfirmClickedState = atom<boolean>({
    key: 'isDeleteConfirmClickedState',
    default: false
})

export function RemovePlayerModal() {
    const [myPlayers] = useRecoilState(myPlayersState)
    const [selectedPosition] = useRecoilState(selectedPositionState)
    const [, setModalDisplayState] = useRecoilState(modalsDisplayState)
    const [, setIsDeleteConfirmClicked] = useRecoilState(isDeleteConfirmClickedState)

    function getAvailablePosition(selectedPosition: number) {
        return <div>
            <div id={'text'} dir={'rtl'}>{getText(selectedPosition)}</div>
            <div id={'buttons-container'} dir={'rtl'}>
                <button id='delete-button' onClick={() => setIsDeleteConfirmClicked(true)}>حذف</button>
                <button id='cancel-button' onClick={() => closeModal()}>لغو</button>
            </div>
        </div>
    }

    function closeModal() {
        setModalDisplayState('none')
        return 'Unknown Player'
    }

    function getText(selectedPosition: number) {
        return myPlayers[selectedPosition] ? 'آیا از حذف ' +
            myPlayers[selectedPosition].web_name +
            ' مطمئن هستید؟'
            :
            closeModal()
    }

    return (
        <div id='modal-div'>
            <div id='header'>حذف بازیکن</div>
            <img id='cloth' src={activeCloth} alt={'active cloth'}/>
            {
                selectedPosition ?
                    getAvailablePosition(selectedPosition)
                    :
                    closeModal()
            }
        </div>
    )
}