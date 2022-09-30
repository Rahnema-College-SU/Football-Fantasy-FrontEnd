import React from 'react';
import {atom, useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {ConfirmationModal} from "../../confirmationModal/ConfirmationModal";
import {selectedReservePlayerState} from "../../player/myTeamPlayer/sideList/MyTeamSideListPlayer";
import {myTeamSelectedPositionsState} from "../../player/myTeamPlayer/schematic/MyTeamSchematicPlayer";
import {myTeamPlayersState} from "../MyTeam";

export const isSubstitutionConfirmClickedState = atom<boolean>({
    key: 'isSubstitutionConfirmClickedState',
    default: false
})

export const substitutionModalDisplayState = atom<'none' | 'block'>({
    key: 'substitutionModalDisplayState',
    default: 'none'
})

export function SubstitutionModal() {
    const myTeamPlayers = useRecoilValue(myTeamPlayersState)
    const [selectedReservePlayer, setSelectedReservePlayer] = useRecoilState(selectedReservePlayerState)
    const [myTeamSelectedPositions, setMyTeamSelectedPositions] = useRecoilState(myTeamSelectedPositionsState)
    const setIsSubstitutionConfirmClicked = useSetRecoilState(isSubstitutionConfirmClickedState)

    function getNamesToSubstitute(): [string, string] {
        if (selectedReservePlayer && myTeamSelectedPositions.length === 1)
            return [myTeamPlayers[myTeamSelectedPositions[0]].webName, selectedReservePlayer.webName]
        else if (myTeamSelectedPositions.length > 1)
            return [myTeamPlayers[myTeamSelectedPositions[0]].webName, myTeamPlayers[myTeamSelectedPositions[1]].webName]
        else
            return ['', '']
    }

    function isModalValid(): boolean {
        return getNamesToSubstitute()[0] !== '' && getNamesToSubstitute()[1] !== ''
    }

    function getText() {
        const namesToSubstitute = getNamesToSubstitute()

        return isModalValid() ? 'آیا از تعویض ' +
            namesToSubstitute[0] +
            ' با ' +
            namesToSubstitute[1] +
            ' اطمینان دارید؟'
            :
            ''
    }

    function cancelOnClick() {
        setSelectedReservePlayer(undefined)
        setMyTeamSelectedPositions([])
    }

    return (
        <ConfirmationModal title={'تعویض بازیکن'}
                           text={getText()}
                           confirmText={'بله'} cancelText={'خیر'}
                           confirmOnClick={() => setIsSubstitutionConfirmClicked(true)} cancelOnClick={cancelOnClick}
                           confirmIdForClick={'substitution-confirm-button'}
                           cancelIdForClick={'substitution-cancel-button'}
                           confirmColor={'#3D185B'} confirmBackgroundColor={'#00FF87'} closeModal={!isModalValid()}
                           isConfirmClickedState={isSubstitutionConfirmClickedState}
                           modalDisplayState={substitutionModalDisplayState}/>
    )
}
