import React, {useEffect} from 'react';
import './RemovePlayerModal.css';
import activeCloth from '../ground/assets/active-cloth.svg';
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {selectedPositionState} from "../ground/Ground";
import {myPlayersState} from "../MyTeam";

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
    const setIsDeleteConfirmClicked = useSetRecoilState(isDeleteConfirmClickedState)
    const [removePlayerModalDisplay, setRemovePlayerModalDisplay] = useRecoilState(removePlayerModalDisplayState)

    useEffect(() => {
        if (removePlayerModalDisplay === 'none')
            setIsDeleteConfirmClicked(false)
    }, [removePlayerModalDisplay])

    function getActionsSection(selectedPosition: number) {
        return <div>
            <div id={'text'}>{getText(selectedPosition)}</div>
            <div id={'buttons-container'}>
                <button id='delete-button' onClick={() => setIsDeleteConfirmClicked(true)}>
                    حذف
                </button>
                <button id='cancel-button' onClick={() => setRemovePlayerModalDisplay('none')}>لغو</button>
            </div>
        </div>
    }

    function getText(selectedPosition: number) {
        return myPlayers[selectedPosition] ? 'آیا از حذف ' +
            myPlayers[selectedPosition].web_name +
            ' مطمئن هستید؟'
            :
            closeModal()
    }

    function closeModal() {
        setRemovePlayerModalDisplay('none')
        return 'Unknown Player'
    }

    return (
        <div id='delete-modal-div' style={{display: removePlayerModalDisplay}}>
            {
                <div>
                    <div id='header'>حذف بازیکن</div>
                    <img id='cloth' src={activeCloth} alt={'active cloth'}/>
                    {
                        selectedPosition ?
                            getActionsSection(selectedPosition)
                            :
                            closeModal()
                    }
                </div>
            }
        </div>
    )
}