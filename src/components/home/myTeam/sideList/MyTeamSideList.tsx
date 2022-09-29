import React from "react";
import './MyTeamSideList.css'
import {SideList} from "../../sideList/SideList";
import {atom, useRecoilState, useRecoilValue} from "recoil";
import {myPlayersState} from "../../transfers/Transfers";
import {playerType} from "../../../../global/Types";
import {myTeamReservePositions} from "../../../../global/Variables";
import {MyTeamSideListPlayer} from "../../player/myTeamPlayer/sideList/MyTeamSideListPlayer";

export const selectedReservePlayerState = atom<playerType | undefined>({
    key: 'selectedReservePlayerState',
    default: undefined
})

export function MyTeamSideList() {
    const myPlayers = useRecoilValue(myPlayersState)
    const [selectedReservePlayer, setSelectedReservePlayer] = useRecoilState(selectedReservePlayerState)

    return (
        <SideList headerText={'بازیکنان ذخیره'}>
            <div id={'reserve-container'}>
                {
                    myTeamReservePositions.map(position => {
                        return (
                            <MyTeamSideListPlayer className={'reserve-div'} player={myPlayers[position]}/>
                        )
                    })
                }
            </div>
        </SideList>
    )
}