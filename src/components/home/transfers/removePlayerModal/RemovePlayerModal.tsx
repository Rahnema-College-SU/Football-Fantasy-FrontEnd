import React from 'react';
import {atom, useRecoilValue, useSetRecoilState} from "recoil";
import {transfersPlayersState} from "../Transfers";
import {selectedPlayerState} from "../sideList/TransfersSideList";
import {transfersSelectedPositionState} from "../../player/transfersPlayer/schematic/TransfersSchematicPlayer";
import {ConfirmationModal} from "../../confirmationModal/ConfirmationModal";

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

    function isModalValid() {
        return !!(transfersSelectedPosition && transfersPlayers[transfersSelectedPosition])
    }

    function getText() {
        return transfersSelectedPosition && isModalValid() ? 'آیا از حذف ' +
            transfersPlayers[transfersSelectedPosition].webName +
            ' مطمئن هستید؟'
            :
            ''
    }

    function cancelOnClick() {
        setSelectedPlayer(undefined)
    }

    return (
        <ConfirmationModal title={'حذف بازیکن'}
                           text={getText()}
                           confirmText={'حذف'} cancelText={'لغو'}
                           confirmOnClick={() => setIsDeleteConfirmClicked(true)} cancelOnClick={cancelOnClick}
                           confirmIdForClick={'delete-confirm-button'} cancelIdForClick={'delete-cancel-button'}
                           confirmColor={'white'} confirmBackgroundColor={'#ED1B5D'} closeModal={!isModalValid()}
                           isConfirmClickedState={isDeleteConfirmClickedState}
                           modalDisplayState={removePlayerModalDisplayState}/>
    )
}
